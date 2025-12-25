import { json, error } from '@sveltejs/kit';
import { SLACK_BOT_TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    if (!SLACK_BOT_TOKEN) {
        throw error(500, 'SLACK_BOT_TOKEN not configured');
    }

    const response = await fetch('https://slack.com/api/users.info', {
        headers: { 'Authorization': `Bearer ${SLACK_BOT_TOKEN}` },
        method: 'POST',
        body: new URLSearchParams({ user: params.id })
    });

    const data = await response.json();

    if (!data.ok) {
        throw error(400, data.error || 'Unknown error');
    }

    const user = data.user;
    const profile = user.profile || {};

    return json({
        id: params.id,
        name: profile.real_name || profile.display_name,
        avatar: profile.image_192 || profile.image_72,
        avatar_large: profile.image_512
    });
};
