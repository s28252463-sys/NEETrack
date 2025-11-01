import { CountdownTimer } from "@/components/countdown-timer";

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center text-white h-full">
            <div className="w-full max-w-sm mx-auto">
                <blockquote className="text-center mb-8">
                    <p className="text-xl italic text-gray-800">"The expert in anything was once a beginner."</p>
                    <footer className="text-right text-sm text-gray-600 mt-2">— Continue</footer>
                </blockquote>

                <CountdownTimer />
            </div>
        </div>
    );
}
