"use client"

import { useWizard } from "@/app/lib/state/useWizardStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StepFooter } from "../StepFooter"
import { ToggleRow } from "../ToggleRow"

export function IconsStep() {
    const { config, updateConfig, next, prev } = useWizard()
    const { icons } = config

    const handleToggle = (
        key: "iconsax_plus" | "flutter_remix" | "hugeicons",
        value: boolean
    ) => {
        updateConfig({
            icons: {
                ...icons,
                [key]: value,
            },
        })
    }

    const selectedIcons = [
        "Default",
        icons.iconsax_plus && "iconsax_plus",
        icons.flutter_remix && "flutter_remix",
        icons.hugeicons && "hugeicons",
    ]
        .filter(Boolean)
        .join(", ")

    return (
        <Card className="border-border/40 bg-background/60 shadow-xl backdrop-blur-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
            <CardHeader>
                <CardTitle className="bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent text-xl font-bold">
                    Icons &amp; icon packs
                </CardTitle>
                <CardDescription>
                    Choose which icon packages to include in your app.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <ToggleRow
                        label="Default Flutter icons"
                        checked
                        onCheckedChange={() => { }}
                        disabled
                    />
                    <ToggleRow
                        label="iconsax_plus"
                        checked={icons.iconsax_plus}
                        onCheckedChange={(value) => handleToggle("iconsax_plus", value)}
                    />
                    <ToggleRow
                        label="flutter_remix"
                        checked={icons.flutter_remix}
                        onCheckedChange={(value) => handleToggle("flutter_remix", value)}
                    />
                    <ToggleRow
                        label="hugeicons"
                        checked={icons.hugeicons}
                        onCheckedChange={(value) => handleToggle("hugeicons", value)}
                    />
                </div>
                <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-foreground/90">{selectedIcons}</span>
                </p>
            </CardContent>
            <StepFooter onPrev={prev} onNext={next} />
        </Card>
    )
}

