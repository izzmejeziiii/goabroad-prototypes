import ComparePlans from "../../components/lead-threshold/ComparePlans";
import HelpLink from "../../components/lead-threshold/shell/HelpLink";

/* V4's Compare plans page, reached from "Upgrade to unlock" when
   ?upgrade=page. */
export default function LeadThresholdUpgradePage() {
    return (
        <>
            <ComparePlans />
            <HelpLink />
        </>
    );
}
