import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { role } = await req.json();

    if (!role) {
        return NextResponse.json({ error: 'Role is required.' }, { status: 400 });
    }

    try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant who generates resume content.',
                    },
                    {
                        role: 'user',
                        content: `Give resume suggestions for a ${role}. Return it in this format:\n\nSkills:\n...\n\nExperience:\n...\n\nProjects:\n...`,
                    },
                ],
            }),
        });

        const data = await res.json();

        if (!data.choices || !data.choices[0]) {
            return NextResponse.json({ error: 'No content returned from AI' }, { status: 500 });
        }

        const text = data.choices[0].message.content;

        // Basic parsing
        const [skillsRaw = '', experienceRaw = '', projectsRaw = ''] = text.split(/\n\n/);

        const skills = skillsRaw.replace(/^Skills:\s*/i, '').trim();
        const experience = experienceRaw.replace(/^Experience:\s*/i, '').trim();
        const projects = projectsRaw.replace(/^Projects:\s*/i, '').trim();

        return NextResponse.json({ skills, experience, projects });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'AI suggestion failed.' }, { status: 500 });
    }
}
