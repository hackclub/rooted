<script lang="ts">
    import { onMount } from 'svelte';
    
    let bornhackOpen = $state(false);
    let orgOpen = $state(false);
    
    interface TeamMember {
        id: string;
        name: string;
        avatar: string;
        description: string;
    }
    
    const teamIds = [
        { id: 'U0938MZG8Q6', description: 'Christian is the Lead Organizer for Rooted. He has worked on many YSWS events before and is excited to bring Rooted to life.' },
        { id: 'U059VC0UDEU', description: 'Mahad is one of the Co-Organizers for Rooted. He is an amazing developer and also works for Hack Club.' },
        { id: 'U078VN0UU2K', description: 'Freddie is one of the Co-Organizers for Rooted. He loves coding and is excited to help out with Rooted.' },
        { id: 'U08NXJL86KT', description: 'Frog is one of the Co-Organizers for Rooted. He is a great member of the team and is always ready to help.' },
    ];
    
    let team: TeamMember[] = $state([]);
    
    onMount(async () => {
        const members: TeamMember[] = [];
        for (const member of teamIds) {
            if (!member.id) {
                members.push({ id: '', name: 'Name Here', avatar: 'https://via.placeholder.com/80', description: member.description });
                continue;
            }
            try {
                const res = await fetch(`/api/slack/user/${member.id}`);
                if (res.ok) {
                    const data = await res.json();
                    members.push({
                        id: member.id,
                        name: data.name,
                        avatar: data.avatar,
                        description: member.description
                    });
                } else {
                    members.push({ id: member.id, name: 'Unknown', avatar: 'https://via.placeholder.com/80', description: member.description });
                }
            } catch (e) {
                members.push({ id: member.id, name: 'Unknown', avatar: 'https://via.placeholder.com/80', description: member.description });
            }
        }
        team = members;
    });
</script>

<style>
    @import "../styles.css";
</style>

<div class="about-container">
    <div class="about-content">
        <a href="/" class="back-btn">← back</a>

        <div class="wip-banner">
            <span class="icon">🚧</span>
            <span class="text">Rooted is a work-in-progress.</span>
        </div>
        
        <h1 class="title">Rooted FAQ</h1>

        <!-- BornHack Collapsible Section -->
        <div class="collapsible-section">
            <button class="collapsible-header" onclick={() => bornhackOpen = !bornhackOpen}>
                <span class="collapsible-title">🏕️ About BornHack</span>
                <span class="collapsible-arrow" class:open={bornhackOpen}>▶</span>
            </button>
            
            {#if bornhackOpen}
                <div class="collapsible-content">
                    <div class="bornhack-info">
                        <p>
                            <a href="https://bornhack.dk" target="_blank" rel="noopener">BornHack</a> is an annual week-long hacker camp held on the Danish island of Funen. You'll camp outdoors, build projects, attend talks, and so much more.
                        </p>
                        <p>
                            BornHack 2026 will likely take place in <strong>July 2026</strong> (exact dates TBD). The event runs for about a week.
                        </p>
                    </div>

                    <div class="photo-gallery">
                        <div class="gallery-grid">
                            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/4a2670327c6112ff_logotent_pink_people.jpg" alt="BornHack tent with people" loading="lazy" decoding="async" width="300" height="200" />
                            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/a526b457de420ccf_participant_tent_laptop.jpg" alt="Participant coding in tent" loading="lazy" decoding="async" width="300" height="200" />
                            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/b591d8f962f07947_night_stars_lights.jpg" alt="Night sky with lights" loading="lazy" decoding="async" width="300" height="200" />
                            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/760b56b7773483d0_dome_lights.jpg" alt="Dome with colorful lights" loading="lazy" decoding="async" width="300" height="200" />
                            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/bf6b2b0ca5dff899_ellen_tesla_coil.jpg" alt="Tesla coil demonstration" loading="lazy" decoding="async" width="300" height="200" />
                            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/c6b87a72a4e46b41_bar_people.jpg" alt="People at the bar" loading="lazy" decoding="async" width="300" height="200" />
                        </div>
                        <p class="gallery-credit">Photos from <a href="https://bornhack.dk" target="_blank" rel="noopener">bornhack.dk</a></p>
                    </div>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2266.4177307032205!2d9.936464176173745!3d55.385617020213814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464cc191437ffa5b%3A0x87b7c392691fc596!2sBornHack!5e0!3m2!1sen!2sdk!4v1766092854910!5m2!1sen!2sdk" width="100%" height="250" style="border:0; border-radius: 8px;" allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="BornHack location map"></iframe>
                </div>
            {/if}
        </div>

        <div class="collapsible-section">
            <button class="collapsible-header" onclick={() => orgOpen = !orgOpen}>
                <span class="collapsible-title">🌳 Rooted Organizers</span>
                <span class="collapsible-arrow" class:open={orgOpen}>▶</span>
            </button>
            
            {#if orgOpen}
                <div class="collapsible-content">
                    <div class="bornhack-info">
                        <p>
                            We have a dedicated team of teen hackers working with Hack Club to make Rooted happen!
                        </p>
                    </div>
<<<<<<< HEAD
                <div class="faq-item">
                    <h2 class="faq-question">Christian</h2>
                    <div class="org-content">
                        <img src="/profilepic/christian.png" alt="Christian's Profile Picture" class="org-pic">
                        <p class="faq-answer">
                            Christian is the Lead Organizer for Rooted. He has worked on many YSWS events before and is excited to bring Rooted to life.
                        </p>
                    </div>
                </div>

                <div class="faq-item">
                    <h2 class="faq-question">Mahad</h2>
                    <div class="org-content">
                        <img src="/profilepic/mahad.png" alt="Mahad's Profile Picture" class="org-pic">
                    <p class="faq-answer">
                        Mahad is one of the Co-Organizers for Rooted. He is an amazing developer and also works for Hack Club.
                    </p>
                    </div>
                </div>

                <div class="faq-item">
                    <h2 class="faq-question">Freddie</h2>
                    <div class="org-content">
                        <img src="/profilepic/freddie.jpeg" alt="Freddie's Profile Picture" class="org-pic">
                    <p class="faq-answer">
                        Freddie is one of the Co-Organizers for Rooted. He loves coding and is excited to help out with Rooted.
                    </p>
                    </div>
                </div>

                <div class="faq-item">
                    <h2 class="faq-question">Frog</h2>
                    <div class="org-content">
                        <img src="/profilepic/frog.png" alt="Frog's Profile Picture" class="org-pic">
                    <p class="faq-answer">
                        Frog is one of the Co-Organizers for Rooted. He is a great member of the team and is always ready to help.
                    </p>
                    </div>
                </div>

                            
                </div>
=======
                    <div class="team-grid">
                        {#each team as member}
                            <div class="team-member">
                                <img src={member.avatar} alt={member.name} class="team-avatar" />
                                <div class="team-info">
                                    <h3 class="team-name">{member.name}</h3>
                                    <p class="team-description">{member.description}</p>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
>>>>>>> 5e80267 (should work now)
            {/if}
        </div>
        <br>
        <!-- General FAQs -->
        <div class="faq-item">
            <h2 class="faq-question">What is Hack Club?</h2>
            <p class="faq-answer">
                Hack Club is a global community of teenage hackers who love building and coding things. 
                We run clubs, events, and projects around the world to help teens learn, create, and connect.
            </p>
        </div>
        <div class="faq-item">
            <h2 class="faq-question">What is Rooted?</h2>
            <p class="faq-answer">
                Rooted is a work-in-progress YSWS (You Ship, We Ship) event sponsored by Hack Club, taking place at BornHack 2026.
                If teens ship hours of code, Hack Club will fund their ticket to BornHack.
                It's designed to bring together teenage hackers for a week of camping, coding, and community building.
                Attendees will have the opportunity to work on projects, attend workshops, and connect with other hackers in a supportive environment.
            </p>
        </div>
        <div class="faq-item">
            <h2 class="faq-question">What if my parents are nervous about me attending?</h2>
            <p class="faq-answer">
                That's totally understandable!
                Hack Club has a guide for adults about its operations <a href="https://docs.google.com/document/d/1W-ZW8D3sWTsTg82JRT52n5upHew5XkAOmHRk4GPWibU/edit?usp=sharing">here</a>, more resources specifically for Rooted will come out in future!
                <br>
                BornHack is a safe environment, which has been run many times. 
                See more information about their <a href="https://bornhack.dk" target="_blank" rel="noopener">previous events</a>! 
                We'll also provide parents with full transparency about accommodations and travel. We will have trained adult staff present at all times during the event.
            </p>
        </div>

        <div class="faq-item">
            <h2 class="faq-question">How can we trust Hack Club?</h2>
            <p class="faq-answer">
                Hack Club is a 501(c)(3) nonprofit organization. Thousands of students around the world are part of Hack Club, 
                and our finances are completely public and open-source. We've safely run major events like Hack Club Arcade, 
                Assemble, Epoch, and Hack Camp, all designed for teens and supported by our trusted adult mentors. 
                You can learn more about us at <a href="https://hackclub.com" target="_blank" rel="noopener">hackclub.com</a>.
            </p>
        </div>

        <div class="faq-item">
            <h2 class="faq-question">Where can I learn more or get involved?</h2>
            <p class="faq-answer">
                Join the Hack Club community on <a href="https://hackclub.com/slack" target="_blank" rel="noopener">Slack</a> 
                to connect with other hackers heading to BornHack! 
            <a href="https://hackclub.enterprise.slack.com/archives/C09LYU1S23Y" class="rsvp-btn" target="_blank" rel="noopener">#Rooted Slack Channel</a>
            <br>
            <br>
            If you're already on Slack, hit the button to join!
            </p>
        </div>
        <div class="faq-item">
            <h2 class="faq-question">Get in touch!</h2>
            <p class="faq-answer">
                If you have any more questions, feel free to reach out to us at <a href="mailto:rooted@hackclub.com">rooted@hackclub.com</a>.
                If you are a member of Hack Club Slack, you can also DM Christian, Mahad, Freddie, or Frog directly OR use the #rooted-help channel!
            </p>
        </div>
    </div>
</div>
