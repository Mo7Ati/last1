import { router, usePage } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { type RouteDefinition, type RouteQueryOptions } from "@/wayfinder";
import { useMemo } from "react";

interface FilterIndicatorProps {
    indexRoute: (options?: RouteQueryOptions) => RouteDefinition<"get">;
    filterLabels?: Record<string, Record<string, string>>; // e.g., { is_active: { "1": "Active", "0": "Inactive" } }
}

export default function FilterIndicator({ indexRoute, filterLabels = {} }: FilterIndicatorProps) {
    const { t: tTables } = useTranslation('tables');
    const { url: pageUrl } = usePage();

    const { activeFilters, searchTerm } = useMemo(() => {
        // Use window.location to get current URL with query params
        const urlObj = new URL(window.location.href);
        const params = urlObj.searchParams;

        // Get search term
        const search = params.get('tableSearch') || "";

        // Get active filters (exclude tableSearch and page)
        const filters: Array<{ key: string; value: string; label: string }> = [];

        params.forEach((value, key) => {
            if (key !== 'tableSearch' && key !== 'page' && value) {
                // Get label from filterLabels or use default
                let label = value;
                if (filterLabels[key] && filterLabels[key][value]) {
                    label = filterLabels[key][value];
                } else if (key === 'is_active') {
                    // Default handling for is_active
                    label = value === "1" ? tTables('common.active') : tTables('common.inactive');
                } else {
                    // Use the key as label prefix if no custom label
                    label = `${key}: ${value}`;
                }

                filters.push({ key, value, label });
            }
        });

        return { activeFilters: filters, searchTerm: search };
    }, [pageUrl, filterLabels, tTables]);

    const clearFilter = (key: string) => {
        router.get(indexRoute({
            mergeQuery: {
                [key]: undefined,
                page: 1,
            },
        }).url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearSearch = () => {
        router.get(indexRoute({
            mergeQuery: {
                tableSearch: undefined,
                page: 1,
            },
        }).url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearAll = () => {
        router.get(indexRoute().url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const hasActiveFilters = searchTerm || activeFilters.length > 0;

    if (!hasActiveFilters) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/50 rounded-md border">
            {searchTerm && (
                <Badge variant="secondary" className="gap-1 pr-1">
                    <span className="font-medium">Search:</span>
                    <span>{searchTerm}</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={clearSearch}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            )}

            {activeFilters.map((filter) => (
                <Badge key={filter.key} variant="secondary" className="gap-1 pr-1">
                    <span className="font-medium capitalize">{filter.key.replace('_', ' ')}:</span>
                    <span>{filter.label}</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => clearFilter(filter.key)}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}

            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="h-7 text-xs text-muted-foreground hover:text-foreground"
                >
                    Clear all
                </Button>
            )}
        </div>
    );
}

