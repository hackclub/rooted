<style>
:global(:root){
  --hero-bg:#fff;
  --accent:#041104;
  --slack:#4A154B;
  --text-dark:#111;
  --muted-white:rgba(255,255,255,0.9);
}

*{box-sizing:border-box}

:global(html),:global(body){
  height:100%;
  margin:0;
  padding:0;
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  color:var(--text-dark);
  scroll-behavior:smooth;
  background-color:var(--hero-bg);
}

.hero{
  background-image:linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)),url("night_stars_lights.jpg");
  background-repeat:no-repeat;
  background-position:right 75%;
  background-size:cover;
  background-attachment:scroll;
  color:#fff;
  min-height:100vh;
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  scroll-snap-align:start;
  margin:0;
  padding:2rem 1rem 3rem;
}

@media(max-width:600px){
  .hero{background-position:right 85%;padding-top:28px}
}

:global(h1){
  font-style:italic;
  color:rgb(43,5,5);
  margin:30px;
  font-size:3rem;
}
.hero h1{
  color:#fff;
  margin:0 0 1rem;
  font-weight:600;
  letter-spacing:0.5px;
}

:global(p){
  text-align:center;
  font-size:20px;
  color:#fff;
  margin:0.25rem 0;
}

:global(p2){
  display:block;
  text-align:center;
  color:#fff;
  font-style:italic;
  font-size:18px;
  margin:0.5rem 0 1rem 0;
}

.bornhack{
  color:#fff;
  font-weight:bold;
  text-decoration:underline;
}

:global(button){
  display:block;
  margin:40px auto;
  padding:10px 20px;
  font-size:16px;
  background-color:#041104;
  color:white;
  border:none;
  border-radius:30px;
  cursor:pointer;
}

.button2{
  color:rgb(193,255,187);
  border:5px solid rgb(193,255,187);
  text-decoration:none;
  display:inline-block;
  padding:20px 25px;
  background-color:#275527;
  border-radius:30px;
  font-style:italic;
  font-size:larger;
  margin:0;
  transition:transform 0.15s ease,background-color 0.15s ease;
}

.rsvp{
  margin-top: 20px;
}

.button2:hover{
  background-color:#193b1a;
  color:rgb(200,255,194);
  transform:scale(1.05);
}

.undertext{
  text-align:center;
  font-size:15px;
  color:#fff;
  font-style:italic;
  margin:0.25rem 0;
}

.hackclub{
  color:#fff;
  font-weight:bold;
  text-decoration:underline;
  font-style:italic;
  cursor:pointer!important;
}

.slack{
  color:#cec9c9;
  font-weight:bold;
  font-style:italic;
  font-size:small;
}

.details-page{
  background-color:#fff;
  color:#111;
  min-height:1vh;
  padding:4rem 1rem;
  display:flex;
  align-items:center;
  justify-content:center;
  scroll-snap-align:start;
}

.details-inner{
  max-width:1000px;
  width:100%;
  padding:3rem 2rem;
}

.rooted-image{
  display:block;
  margin:0 auto 1.25rem;
  max-width:320px;
  width:100%;
  height:auto;
}

@media(max-width:600px){
  .button2,button{padding:8px 12px;font-size:15px}
  .details-inner{padding:0 1rem}
  .rooted-image{max-width:60%;}
}

.faq{
  margin:0 1rem 1.5rem auto;
  padding-left:1rem;
  font-size:1.5rem;
  text-align:center;
  color:#111;
  font-style:italic;
}

.faq-section{
  background-color: #fff !important;
}

.faq+dl{margin-top:1rem}
.details-inner dl{margin:0;padding:0}
.details-inner dl dt{margin-top:1.25rem;font-weight:700}
.details-inner dl dd{margin:0.4rem 0 0.8rem 1rem;line-height:1.5;color:#333}

@media(max-width:600px){
  .details-inner{padding:2rem 1rem}
  .faq{margin-right:0.6rem;padding-left:0.7rem;font-size:1.25rem}
  .details-inner dl dt{margin-top:0.9rem}
}

:global(.footer){
  text-align:center;
  color:#fff;
  font-style:italic;
}

.button-row{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:0.5rem;
  text-align:center;
  margin-top:1rem;
}

.top-button{
  position:absolute;
  top:18px;
  right:18px;
  z-index:20;
}

@media(max-width:600px){
  .top-button{top:12px;right:12px;padding:8px 12px}
  .button-row{gap:0.4rem}
  .button2{padding:8px 12px}
}

.modal{
  display:none;
  position:fixed;
  inset:0;
  align-items:center;
  justify-content:center;
  z-index:1000;
}
.modal.open{display:flex}
.modal-backdrop{
  position:absolute;
  inset:0;
  background:rgba(0,0,0,0.6);
}
.modal-content{
  position:relative;
  background:#fff;
  color:#111;
  width:min(1000px,calc(100% - 3rem));
  max-height:90vh;
  overflow:auto;
  border-radius:12px;
  padding:1.25rem 1.5rem;
  box-shadow:0 10px 30px rgba(0,0,0,0.3);
  box-sizing:border-box;
  z-index:10;
}
.modal-close{
  position:absolute;
  top:8px;
  right:10px;
  border:rgb(193,255,187) solid;
  border-width:5px;
  font-size:1.5rem;
  line-height:1;
  cursor:pointer;
}
.details-images{
  display:grid;
  grid-template-columns:repeat(5, 1fr);
  gap:0.5rem;
  margin-top:1rem;
  justify-content:center;
  background-color: #fff !important;
  padding: 1rem;
}
.details-images img{
  width:100%;
  aspect-ratio:1/1;
  border-radius:6px;
  object-fit:cover;
}

@media(max-width:600px){
  .modal-content{padding:1rem}
  .details-images{grid-template-columns:repeat(2, 1fr);}
}
.details-page{
  background-color: #ec3750;
}
.organisers {
    color: #111;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 20px;
    font-style: italic;
    margin-top: 20px;
}

.orgtitle {
    font-weight: bold;
    font-size: 40px;
    margin-top: 60px;
    margin-bottom: 20px;
    text-align: center;
    

}

.orgname {
    background-color: #5bc0de;
    border-radius: 25px;
    padding: 20px;
    margin-bottom: 20px;
    align-items: center;
    font-size: 30px;
    display: flex;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: fit-content;
    height: inherit;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.orgname:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.orgname img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 15px;
    padding: 10px;
}

.hackclub-banner {
    position: fixed;
    top: 20px;
    left: 0;
    z-index: 15;
}

.hackclub-banner img {
    max-width: 150px;
    height: auto;
    display: block;
}

@media(max-width:600px){
  .hackclub-banner img {
    max-width: 100px;
  }
}

.map-container {
  margin-top: 20px;
  width: 100%;
  height: 600px;
}

.map-container iframe {
  width: 100%;
  height: 100%;
}

</style>


<main class="hero">
    <button id="open-faq" class="button2 top-button" type="button" aria-controls="faq-modal" on:click={openModal}>FAQ</button>
        <h1 class="h1">ROOTED</h1>
        <p>Spend time coding, Come to <a class="bornhack" href="https://bornhack.dk">bornhack</a> 🏕️</p>
        <p2>Code with other teens in a forest in Denmark for a week all for free</p2>
        <div class="button-row">
            <p class="undertext">This event is a W.I.P and for Hack Club members aged 13 to 18.</p>
            <p class="slack">not a hack clubber? check out <a class="hackclub" href="https://hackclub.com">Hack Club</a> to become one!</p>
            <p class="slack">Check out <a class="hackclub" href="https://hackclub.com">Hack Club</a> for events!</p>
            <a class="button2 rsvp" href="https://forms.hackclub.com/rootedrsvp" target="_blank" rel="noopener">RSVP</a>
        </div>
    </main>
    
    <a href="https://hackclub.com/" class="hackclub-banner"><img src="https://assets.hackclub.com/banners/2025.svg" alt="Hack Club"/></a>
    
    <div id="faq-modal" class="modal" class:open={modalOpen} bind:this={modalEl} role="dialog" aria-modal="true" aria-hidden={modalOpen ? 'false' : 'true'} aria-labelledby="faq-title">
            <div class="modal-backdrop" data-close="true" role="button" tabindex="0" on:click={onBackdropClick} on:keydown={onBackdropKeydown}></div>
            <div class="modal-content" role="document">
                <button class="modal-close button2" aria-label="Close FAQ" on:click={closeModal} bind:this={closeBtnEl}>×</button>
                <section class="details-page faq-section" aria-label="Details page">
                    <div class="details-inner faq-section">
                        <img class="rooted-image" src="image-removebg-preview (4).png" alt="Rooted illustration">
                        <h2 id="faq-title" class="faq">rooted FAQ</h2>
                        <dl>
                                <dt>What is BornHack?</dt>
                                <dd>BornHack is an annual week-long hacker rooted held on the Danish island of Funen. You will build projects amongst other teens! Visit the official site here: <a href="https://bornhack.dk/bornhack-2025/">https://bornhack.dk/bornhack-2025/</a></dd>

                                <dt>What is Hack Club?</dt>
                                <dd>Hack Club is a global community of teenage hackers who love building and coding things. We run clubs, events, and projects around the world to help teens learn, create, and connect.</dd>

                                <dt>When is Rooted/BornHack happening?</dt>
                                <dd>BornHack 2026 will likely take place in July 2026 (exact dates to be confirmed). The event usually runs for about a week.</dd>

                                <dt>My parents are nervous about me attending. How can I reassure them?</dt>
                                <dd>That's totally understandable! BornHack is a safe environment, which has been run many times. See more information about <a href="https://bornhack.dk/bornhack-2024/">their previous event</a>! We'll also provide parents with full transparency about accommodations and travel.</dd>

                                <dt>How can we trust Hack Club?</dt>
                                <dd>Hack Club is a 501(c)(3) nonprofit organization. Thousands of students around the world are part of Hack Club, and our finances are completely public and open-source. We've safely run major events like Hack Club Arcade, Assemble, Epoch, and Hack Rooted, all designed for teens and supported by our trusted adult mentors. You can learn more about us at <a href="https://hackclub.com">https://hackclub.com</a>.</dd>

                                <dt>Where can I learn more or get involved?</dt>
                                <dd>Join the Hack Club community on <a href="https://hackclub.com/slack/">Slack</a> to connect with other hackers heading to BornHack! This is currently a work-in-progress.</dd>
                        </dl>
                    </div>
                </section>
            </div>
    </div>
    <div class="details-images" style="padding-bottom: 10px;" aria-hidden="false">
            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/6fe379cf70041d5bc30bd62020a948bac392faab_image.png" alt="">
            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/2754ba6bd20283d32df6168fb3a2a9ca78403e53_image.png" alt="">
            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/43bf3a3dfacfd4f1b79e3b86232a6d315324e839_image.png" alt="">
            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/fff964ae7ebd8f6cd4ccc7ffdacc113f4cb9c8c1_image.png" alt="">
            <img src="https://bornhack.dk/static/img/bornhack-2020/participant_tent_laptop.jpg" alt="">
            <img src="https://bornhack.dk/static/img/bornhack-2021/thumbnail_volunteers.jpg.png" alt="">
            <img src="https://bornhack.dk/static/img/bornhack-2018/fonsmark/thumbnail_FB1_9970_cropped.JPG.png" alt="">
            <img src="https://bornhack.dk/static/img/bornhack-2018/flummer/thumbnail_DSC_7054_cropped.jpg.png" alt="">
            <img src="https://bornhack.dk/static/img/bornhack-2017/fonsmark/thumbnail_FB1_7724_cropped.jpg.png" alt="">
            <img src="https://bornhack.dk/static/img/bornhack-2020/thumbnail_bar_people.jpg.png" alt="">
    </div>
    
    <div class="map-container">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d581122.5206717683!2d9.607362684114461!3d55.32291415216381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464cd93542975035%3A0xaa28cea815b8429!2sFunen!5e0!3m2!1sen!2suk!4v1762563606484!5m2!1sen!2suk" 
            width="100%" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map of Funen, Denmark"></iframe>
    </div>
    
    <div class="details-page">
      <div class="organisers">
        <h2 class="orgtitle">Organisers</h2>
        <a href="https://hackclub.enterprise.slack.com/team/U0938MZG8Q6" class="orgname">
            <img src="https://ca.slack-edge.com/T0266FRGM-U0938MZG8Q6-118e1c7a1f11-512" alt="Slack pfp for @Christian">
            <h3>Christian</h3>
            <dd>Christian is a passionate coder and the lead organiser of Rooted.</dd>
        </a>
        <a href="https://hackclub.enterprise.slack.com/team/U08NXJL86KT" class="orgname">
            <img src="https://ca.slack-edge.com/T0266FRGM-U08NXJL86KT-325f8f9f4f9b-512" alt="Slack pfp for @Frog">
            <h3>Frog</h3>
            <dd>Frog is an active community member, passionate hardware maker.</dd>
        </a>
        <a href="https://hackclub.enterprise.slack.com/team/U078VN0UU2K" class="orgname">
            <img src="https://ca.slack-edge.com/T0266FRGM-U078VN0UU2K-40da09402b3d-512" alt="Slack pfp for @Freddie">
            <h3>Freddie</h3>
            <dd>Freddie is an enthusiastic developer for Rooted.</dd>
        </a>
        <a href="https://hackclub.enterprise.slack.com/team/U059VC0UDEU" class="orgname">
            <img src="https://ca.slack-edge.com/T0266FRGM-U059VC0UDEU-81a3d8975b81-512" alt="Slack pfp for @Mahad">
            <h3>Mahad</h3>
            <dd>Mahad is a dedicated hacker/Coder.</dd>
        </a>
        <a href="https://hackclub.enterprise.slack.com/team/U06T30DNB3L" class="orgname">
            <img src="https://ca.slack-edge.com/T0266FRGM-U06T30DNB3L-13d0d6e57152-512" alt="Slack pfp for @Euan Ripper">
            <h3>Euan Ripper</h3>
            <dd>Euan is HQ and involved in Rooted!</dd>
        </a>
      </div>
    </div>
<script lang="ts">
    import { onMount, tick } from 'svelte';

    let modalOpen = false;
    let previousActive: HTMLElement | null = null;
    let modalEl: HTMLElement | null = null;
    let closeBtnEl: HTMLButtonElement | null = null;

    async function openModal() {
        previousActive = document.activeElement as HTMLElement | null;
        modalOpen = true;
        await tick();
        document.body.style.overflow = 'hidden';
        if (closeBtnEl) closeBtnEl.focus();
    }

    function closeModal() {
        modalOpen = false;
        document.body.style.overflow = '';
        if (previousActive instanceof HTMLElement) previousActive.focus();
    }

    function onBackdropClick(e: MouseEvent) {
        if (e.target === e.currentTarget) closeModal();
    }

    function onBackdropKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeModal();
        }
    }

    function onKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' && modalOpen) closeModal();
    }

    onMount(() => {
        document.addEventListener('keydown', onKeydown);
        return () => document.removeEventListener('keydown', onKeydown);
    });
</script>