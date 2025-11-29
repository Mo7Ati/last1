import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
    const { locales, currentLocale } = usePage<SharedData>().props;
    const { i18n } = useTranslation();

    const handleLanguageChange = (locale: string) => {
        // Fully reload the page by redirecting to the language route
        window.location.href = `/language/${locale}`;
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Languages className="h-4 w-4" />
                    {locales[currentLocale] || currentLocale}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48">
                <DropdownMenuRadioGroup
                    onValueChange={handleLanguageChange}
                    value={currentLocale}
                >
                    {Object.entries(locales).map(([code, label]) => (
                        <DropdownMenuRadioItem key={code} value={code}>
                            <span className="flex items-center gap-2">
                                <span>{label}</span>
                            </span>
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default LanguageSwitch;
