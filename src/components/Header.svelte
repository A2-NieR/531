<script lang="ts">
  import {
    Header,
    HeaderGlobalAction,
    HeaderUtilities,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent
  } from 'carbon-components-svelte';
  import Play from 'carbon-icons-svelte/lib/Play.svelte';
  import Pause from 'carbon-icons-svelte/lib/Pause.svelte';
  import Reset from 'carbon-icons-svelte/lib/Reset.svelte';

  let isSideNavOpen = false;

  const closeSidebar = () => (isSideNavOpen = false);
</script>

<Header platformName="2:00" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>

  <HeaderUtilities>
    <HeaderGlobalAction aria-label="Start" icon={Play} />
    <HeaderGlobalAction aria-label="Pause" icon={Pause} />
    <HeaderGlobalAction aria-label="Reset" icon={Reset} />
  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink text="Home" href="/" on:click={closeSidebar} />
    <SideNavLink text="Routine" href="#/routine" on:click={closeSidebar} />
    <SideNavLink text="Progress" href="#/progress" on:click={closeSidebar} />
    <SideNavLink text="Settings" href="#/settings" on:click={closeSidebar} />
  </SideNavItems>
</SideNav>
