import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
import { useTranslation } from 'react-i18next';

export type RevenueByStorePoint = {
  store_id: number;
  store_name: string;
  revenue: number;
};

const chartConfig = {
  store_name: { label: 'Store' },
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface RevenueByStoreChartProps {
  data: RevenueByStorePoint[];
}

export function RevenueByStoreChart({ data }: RevenueByStoreChartProps) {
  const { t } = useTranslation('dashboard');

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  if (!data?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('charts.revenue_by_store_title')}</CardTitle>
          <CardDescription>{t('charts.revenue_by_store_description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center text-muted-foreground">
          {t('charts.no_revenue_data')}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('charts.revenue_by_store_title')}</CardTitle>
        <CardDescription>{t('charts.revenue_by_store_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 12, right: 12 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} />
            <YAxis
              type="category"
              dataKey="store_name"
              tickLine={false}
              axisLine={false}
              width={120}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => [formatCurrency(Number(value)), t('charts.revenue_by_store_title')]}
                  indicator="dot"
                />
              }
            />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
