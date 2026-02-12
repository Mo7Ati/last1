import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

export type OrdersOverTimePoint = {
  date: string;
  orders_count: number;
  revenue: number;
};

const chartConfig = {
  date: { label: 'Date' },
  orders_count: {
    label: 'Orders',
    color: 'hsl(var(--chart-1))',
  },
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

type TimeRange = '7d' | '30d' | '90d';

interface OrdersOverTimeChartProps {
  data: OrdersOverTimePoint[];
}

export function OrdersOverTimeChart({ data }: OrdersOverTimeChartProps) {
  const { t } = useTranslation('dashboard');
  const [timeRange, setTimeRange] = React.useState<TimeRange>('30d');
  const [metric, setMetric] = React.useState<'orders_count' | 'revenue'>('orders_count');

  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const filteredData = React.useMemo(() => {
    if (!data?.length) return [];
    const start = new Date();
    start.setDate(start.getDate() - days);
    const startStr = start.toISOString().slice(0, 10);
    return data.filter((item) => item.date >= startStr);
  }, [data, days]);

  const formatValue = (value: number) =>
    metric === 'revenue'
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
      : value.toLocaleString();

  return (
    <Card className="pt-0">
      <CardHeader className="flex flex-col gap-2 space-y-0 border-b py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid flex-1 gap-1">
          <CardTitle>{t('charts.orders_over_time_title')}</CardTitle>
          <CardDescription>{t('charts.orders_over_time_description')}</CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={metric} onValueChange={(v) => setMetric(v as 'orders_count' | 'revenue')}>
            <SelectTrigger className="w-[140px] rounded-lg" aria-label="Metric">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="orders_count">{t('charts.orders_over_time_metric_orders')}</SelectItem>
              <SelectItem value="revenue">{t('charts.orders_over_time_metric_revenue')}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
            <SelectTrigger className="w-[160px] rounded-lg" aria-label="Time range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">{t('charts.last_7_days')}</SelectItem>
              <SelectItem value="30d">{t('charts.last_30_days')}</SelectItem>
              <SelectItem value="90d">{t('charts.last_3_months')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-orders_count)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-orders_count)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                  }
                  formatter={(value) => [
                    formatValue(Number(value)),
                    metric === 'revenue' ? t('charts.orders_over_time_metric_revenue') : t('charts.orders_over_time_metric_orders'),
                  ]}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey={metric}
              type="natural"
              fill={metric === 'revenue' ? 'url(#fillRevenue)' : 'url(#fillValue)'}
              stroke={metric === 'revenue' ? 'var(--color-revenue)' : 'var(--color-orders_count)'}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
