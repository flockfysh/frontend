declare interface PullRequestStats {
    messages: number;
    newAssets: number;
    changedAssets: number;
    deletedAssets: number;
}

declare interface ExpandedPullRequest extends Flockfysh.PullRequest {
    user: RedactedUser;
    stats: PullRequestStats;
}

declare interface ExpandedPullRequestMessage
    extends Flockfysh.PullRequestMessage {
    user: RedactedUser;
}
