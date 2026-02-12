import * as React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { useTranslation } from 'react-i18next';

export type OrdersByStatusPoint = {
  status: string;
  label: string;
  count: number;
};

const STATUS_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
];

interface OrdersByStatusChartProps {
  data: OrdersByStatusPoint[];
}

export function OrdersByStatusChart({ data }: OrdersByStatusChartProps) {
  const { t } = useTranslation('dashboard');

  const chartConfig = React.useMemo<ChartConfig>(() => {
    const config: ChartConfig = {
      count: { label: 'Count' },
    };
    data.forEach((item, i) => {
      config[item.status] = { label: item.label, color: STATUS_COLORS[i % STATUS_COLORS.length] };
    });
    return config;
  }, [data]);

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const chartData = data.filter((d) => d.count > 0);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('charts.orders_by_status_title')}</CardTitle>
          <CardDescription>{t('charts.orders_by_status_description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center text-muted-foreground">
          {t('charts.no_orders_data')}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('charts.orders_by_status_title')}</CardTitle>
        <CardDescription>{t('charts.orders_by_status_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="status" hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              innerRadius={60}
              strokeWidth={2}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.status} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="label" />} />
          </PieChart>
        </ChartContainer>
        {total > 0 && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            Total: {total.toLocaleString()} orders
          </p>
        )}
      </CardContent>
    </Card>
  );
}
