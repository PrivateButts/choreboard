<template>
  <div class="fab">
    <!-- a focusable div with tabindex is necessary to work on all browsers. role="button" is necessary for accessibility -->
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </div>

    <!-- close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder -->
    <div class="fab-close">
      Close <span class="btn btn-circle btn-lg btn-error">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </span>
    </div>

    <!-- buttons that show up when FAB is open -->
    <div>
      Add Bounty
      <AddBountyModal :btnClasses="'btn btn-lg btn-circle'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Money-Payments-Diamond--Streamline-Pixel"
          height="32" width="32">
          <desc>
            Money Payments Diamond Streamline Icon: https://streamlinehq.com
          </desc>
          <title>money-payments-diamond</title>
          <g>
            <path d="M30.47 28.95H32v1.53h-1.53Z" fill="currentColor" stroke-width="1"></path>
            <path
              d="m30.47 1.52 -1.52 0 0 1.53 -1.52 0 0 1.52 1.52 0 0 1.53 1.52 0 0 -1.53 1.53 0 0 -1.52 -1.53 0 0 -1.53z"
              fill="currentColor" stroke-width="1"></path>
            <path d="M28.95 22.86h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M27.43 24.38h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M27.43 21.33h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M27.43 15.24h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M27.43 9.14h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M25.9 22.86h1.53v1.52H25.9Z" fill="currentColor" stroke-width="1"></path>
            <path d="M25.9 16.76h1.53v1.53H25.9Z" fill="currentColor" stroke-width="1"></path>
            <path d="M25.9 7.62h1.53v1.52H25.9Z" fill="currentColor" stroke-width="1"></path>
            <path d="M24.38 18.29h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M24.38 6.1h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path
              d="m24.38 32 0 -1.52 1.52 0 0 -1.53 -1.52 0 0 -1.52 -1.53 0 0 1.52 -1.52 0 0 1.53 1.52 0 0 1.52 1.53 0z"
              fill="currentColor" stroke-width="1"></path>
            <path d="M22.85 19.81h1.53v1.52h-1.53Z" fill="currentColor" stroke-width="1"></path>
            <path d="M21.33 21.33h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M21.33 15.24h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M21.33 9.14h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M21.33 1.52h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M19.81 22.86h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M19.81 16.76h1.52v3.05h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M19.81 7.62h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M18.28 19.81h1.53v3.05h-1.53Z" fill="currentColor" stroke-width="1"></path>
            <path d="m18.28 22.86 -1.52 0 0 4.57 1.52 0 0 -1.52 1.53 0 0 -1.53 -1.53 0 0 -1.52z" fill="currentColor"
              stroke-width="1"></path>
            <path d="M16.76 0h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M13.71 27.43h3.05v1.52h-3.05Z" fill="currentColor" stroke-width="1"></path>
            <path d="m13.71 22.86 -1.52 0 0 1.52 -1.53 0 0 1.53 1.53 0 0 1.52 1.52 0 0 -4.57z" fill="currentColor"
              stroke-width="1"></path>
            <path d="M10.66 19.81h1.53v3.05h-1.53Z" fill="currentColor" stroke-width="1"></path>
            <path d="M9.14 22.86h1.52v1.52H9.14Z" fill="currentColor" stroke-width="1"></path>
            <path d="M9.14 16.76h1.52v3.05H9.14Z" fill="currentColor" stroke-width="1"></path>
            <path d="M9.14 7.62h1.52v1.52H9.14Z" fill="currentColor" stroke-width="1"></path>
            <path d="M9.14 1.52h1.52v1.53H9.14Z" fill="currentColor" stroke-width="1"></path>
            <path d="M7.62 27.43h1.52v1.52H7.62Z" fill="currentColor" stroke-width="1"></path>
            <path d="M7.62 21.33h1.52v1.53H7.62Z" fill="currentColor" stroke-width="1"></path>
            <path d="M7.62 15.24h1.52v1.52H7.62Z" fill="currentColor" stroke-width="1"></path>
            <path d="M7.62 9.14h1.52v1.53H7.62Z" fill="currentColor" stroke-width="1"></path>
            <path
              d="m10.66 6.1 0 1.52 1.53 0 0 -1.52 6.09 0 0 1.52 1.53 0 0 -1.52 4.57 0 0 -1.53 -18.29 0 0 1.53 4.57 0z"
              fill="currentColor" stroke-width="1"></path>
            <path d="M6.09 19.81h1.53v1.52H6.09Z" fill="currentColor" stroke-width="1"></path>
            <path d="M4.57 18.29h1.52v1.52H4.57Z" fill="currentColor" stroke-width="1"></path>
            <path d="M4.57 6.1h1.52v1.52H4.57Z" fill="currentColor" stroke-width="1"></path>
            <path d="M3.04 24.38h1.53v1.53H3.04Z" fill="currentColor" stroke-width="1"></path>
            <path d="M3.04 16.76h1.53v1.53H3.04Z" fill="currentColor" stroke-width="1"></path>
            <path d="M3.04 7.62h1.53v1.52H3.04Z" fill="currentColor" stroke-width="1"></path>
            <path d="M1.52 30.48h1.52V32H1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M1.52 25.91h1.52v1.52H1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M1.52 22.86h1.52v1.52H1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M1.52 15.24h1.52v1.52H1.52Z" fill="currentColor" stroke-width="1"></path>
            <path
              d="m1.52 13.71 4.57 0 0 1.53 1.53 0 0 -1.53 15.23 0 0 1.53 1.53 0 0 -1.53 4.57 0 0 1.53 1.52 0 0 -4.57 -1.52 0 0 1.52 -4.57 0 0 -1.52 -1.53 0 0 1.52 -15.23 0 0 -1.52 -1.53 0 0 1.52 -4.57 0 0 -1.52 -1.52 0 0 4.57 1.52 0 0 -1.53z"
              fill="currentColor" stroke-width="1"></path>
            <path d="M1.52 9.14h1.52v1.53H1.52Z" fill="currentColor" stroke-width="1"></path>
            <path
              d="m1.52 4.57 1.52 0 0 -1.52 1.53 0 0 -1.53 -1.53 0 0 -1.52 -1.52 0 0 1.52 -1.52 0 0 1.53 1.52 0 0 1.52z"
              fill="currentColor" stroke-width="1"></path>
            <path d="M0 24.38h1.52v1.53H0Z" fill="currentColor" stroke-width="1"></path>
          </g>
        </svg>
      </AddBountyModal>
    </div>
    <div>
      Add Chore
      <AddChoreModal :btnClasses="'btn btn-lg btn-circle'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Interface-Essential-Home-2--Streamline-Pixel"
          height="32" width="32">
          <desc>
            Interface Essential Home 2 Streamline Icon: https://streamlinehq.com
          </desc>
          <title>interface-essential-home-2</title>
          <g>
            <path
              d="m0.765 16.76 3.04 0 0 -1.52 1.53 0 0 -1.53 1.52 0 0 -1.52 1.53 0 0 -1.52 1.52 0 0 -1.53 1.52 0 0 -1.52 1.53 0 0 -1.53 1.52 0 0 -1.52 3.05 0 0 1.52 1.52 0 0 1.53 1.53 0 0 1.52 1.52 0 0 1.53 1.52 0 0 1.52 1.53 0 0 1.52 1.52 0 0 1.53 1.52 0 0 1.52 3.05 0 0 -3.05 -1.52 0 0 -1.52 -1.53 0 0 -1.52 -1.52 0 0 -1.53 -1.52 0 0 -1.52 -1.53 0 0 -1.53 -1.52 0 0 -1.52 -1.52 0 0 -1.52 -1.53 0 0 -1.53 -1.52 0 0 -1.52 -3.05 0 0 1.52 -1.52 0 0 1.53 -1.53 0 0 1.52 -1.52 0 0 1.52 -1.52 0 0 1.53 -1.53 0 0 1.52 -1.52 0 0 1.53 -1.53 0 0 1.52 -1.52 0 0 1.52 -1.52 0 0 3.05z"
              fill="currentColor" stroke-width="1"></path>
            <path d="m26.665 30.48 -6.09 0 0 -7.62 -1.53 0 0 9.14 9.14 0 0 -13.72 -1.52 0 0 12.2z" fill="currentColor"
              stroke-width="1"></path>
            <path d="M25.145 16.76h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M23.615 15.24h1.53v1.52h-1.53Z" fill="currentColor" stroke-width="1"></path>
            <path d="M22.095 13.71h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M20.575 12.19h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M19.045 10.67h1.53v1.52h-1.53Z" fill="currentColor" stroke-width="1"></path>
            <path d="M17.525 21.33h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M17.525 9.14h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M14.475 19.81h3.05v1.52h-3.05Z" fill="currentColor" stroke-width="1"></path>
            <path d="M14.475 7.62h3.05v1.52h-3.05Z" fill="currentColor" stroke-width="1"></path>
            <path d="M12.955 21.33h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M12.955 9.14h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="m12.955 22.86 -1.53 0 0 7.62 -6.09 0 0 -12.2 -1.53 0 0 13.72 9.15 0 0 -9.14z" fill="currentColor"
              stroke-width="1"></path>
            <path d="M11.425 10.67h1.53v1.52h-1.53Z" fill="currentColor" stroke-width="1"></path>
            <path d="M9.905 12.19h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M8.385 13.71h1.52v1.53h-1.52Z" fill="currentColor" stroke-width="1"></path>
            <path d="M6.855 15.24h1.53v1.52h-1.53Z" fill="currentColor" stroke-width="1"></path>
            <path d="M5.335 16.76h1.52v1.52h-1.52Z" fill="currentColor" stroke-width="1"></path>
          </g>
        </svg>
      </AddChoreModal>
    </div>
  </div>
</template>

<script setup>
</script>
