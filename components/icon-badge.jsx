const { cn } = require("@/lib/utils");
const { cva } = require("class-variance-authority");

const backgroundVariants = cva(
    "rounded-full items-center justify-center border shadow-sm",
    {
        variants: {
            variant: {
                default: "bg-sky-100 border-sky-200",
                success: "bg-emerald-100 border-emerald-200",
            },
            size: {
                default: "p-3", 
                sm: "p-2",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        }
    }
);

const iconVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: "text-sky-700",
                success: "text-emerald-700",
            },
            size: {
                default: "h-6 w-6", 
                sm: "h-4 w-4",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        }
    }
);

export const IconBadge = ({
    icon: Icon,
    variant = "default",
    size = "default"
}) => {
    return (
        <div className={cn(backgroundVariants({ variant, size }))}>
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    );
};
