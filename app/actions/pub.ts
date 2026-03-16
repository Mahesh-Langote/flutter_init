"use server"

export async function fetchPackageMetrics(packageName: string) {
    try {
        const metricsUrl = `https://pub.dev/api/packages/${packageName}/metrics`;
        const metricsRes = await fetch(metricsUrl, { next: { revalidate: 604800 } });
        const metricsData = await metricsRes.json();

        const packageUrl = `https://pub.dev/api/packages/${packageName}`;
        const packageRes = await fetch(packageUrl, { next: { revalidate: 604800 } });
        const packageData = await packageRes.json();

        const publisherTag = metricsData.score?.tags?.find((t: string) => t.startsWith('publisher:'));
        const publisher = publisherTag ? publisherTag.split(':')[1] : undefined;

        return {
            description: packageData.latest?.pubspec?.description,
            version: packageData.latest?.version,
            likes: metricsData.score?.likeCount,
            points: metricsData.score?.grantedPoints,
            downloads: metricsData.score?.downloadCount30Days,
            publisher: publisher,
        };
    } catch (e) {
        console.error("Error fetching pub.dev metrics for package:", packageName, e);
        return null;
    }
}
