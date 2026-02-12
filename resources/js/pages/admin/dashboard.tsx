import { OrdersOverTimeChart } from '@/components/charts/orders-over-time-chart';
import type { OrdersOverTimePoint } from '@/components/charts/orders-over-time-chart';
import { OrdersByStatusChart } from '@/components/charts/orders-by-status-chart';
import type { OrdersByStatusPoint } from '@/components/charts/orders-by-status-chart';
import { RevenueByStoreChart } from '@/components/charts/revenue-by-store-chart';
import type { RevenueByStorePoint } from '@/components/charts/revenue-by-store-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { DollarSign, Package, ShoppingCart, Store, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardStats {
  orders_count: number;
  customers_count: number;
  products_count: number;
  total_revenue: number;
  stores_count: number;
}

interface ChartData {
  ordersOverTime: OrdersOverTimePoint[];
  ordersByStatus: OrdersByStatusPoint[];
  revenueByStore: RevenueByStorePoint[];
}

interface DashboardProps {
  stats: DashboardStats;
  chartData: ChartData;
}

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const { stats, chartData } = usePage<SharedData & DashboardProps>().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('title'),
      href: '/admin/dashboard',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const statCards = [
    {
      titleKey: 'stats.orders' as const,
      descKey: 'stats.orders_description' as const,
      value: formatNumber(stats?.orders_count ?? 0),
      icon: ShoppingCart,
      className: 'border-blue-200 dark:border-blue-800',
    },
    {
      titleKey: 'stats.customers' as const,
      descKey: 'stats.customers_description' as const,
      value: formatNumber(stats?.customers_count ?? 0),
      icon: Users,
      className: 'border-green-200 dark:border-green-800',
    },
    {
      titleKey: 'stats.products' as const,
      descKey: 'stats.products_description' as const,
      value: formatNumber(stats?.products_count ?? 0),
      icon: Package,
      className: 'border-purple-200 dark:border-purple-800',
    },
    {
      titleKey: 'stats.revenue' as const,
      descKey: 'stats.revenue_description' as const,
      value: formatCurrency(stats?.total_revenue ?? 0),
      icon: DollarSign,
      className: 'border-amber-200 dark:border-amber-800',
    },
    {
      titleKey: 'stats.stores' as const,
      descKey: 'stats.stores_description' as const,
      value: formatNumber(stats?.stores_count ?? 0),
      icon: Store,
      className: 'border-orange-200 dark:border-orange-800',
    },
  ];

  const ordersOverTime = chartData?.ordersOverTime ?? [];
  const ordersByStatus = chartData?.ordersByStatus ?? [];
  const revenueByStore = chartData?.revenueByStore ?? [];

  return (
    <AppLayout breadcrumbs={breadcrumbs} title={t('title')}>
      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className={stat.className}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t(stat.titleKey)}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <CardDescription className="mt-1 text-xs">{t(stat.descKey)}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <OrdersOverTimeChart data={ordersOverTime} />

        <div className="grid gap-6 lg:grid-cols-2">
          <OrdersByStatusChart data={ordersByStatus} />
          <RevenueByStoreChart data={revenueByStore} />
        </div>
      </div>
    </AppLayout>
  );
}
