import { HeroSection } from "@/app/components/landing/HeroSection"

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 font-sans selection:bg-primary/20">
            <HeroSection />
        </main>
    )
}