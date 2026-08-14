import { CompareProvider } from "../components/program-comparison/compare/compare-context";
import { CompareTray } from "../components/program-comparison/compare/compare-bar";
import SignInModal from "../components/program-comparison/compare/sign-in-modal";
import CompareVersionToggle from "../components/program-comparison/compare/version-toggle";

/**
 * Holds the comparison state for every page under /program-comparison, so a
 * program picked on the directory is still selected on the search results.
 *
 * Comparing is gated behind an account, so pressing Compare opens GoAbroad's
 * sign-in modal. The comparison table itself lives in `compare-modal.tsx`,
 * parked until there's a signed-in state to show it to.
 */
export default function ProgramComparisonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CompareProvider>
            {children}
            <CompareTray />
            <SignInModal />
            <CompareVersionToggle />
        </CompareProvider>
    );
}
