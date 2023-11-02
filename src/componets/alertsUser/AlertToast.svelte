<script>
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { notifications } from "./alert";
</script>

<div class="notifications">
  {#each $notifications as notification (notification.id)}
    <div
      animate:flip
      class="alert {[notification.type]} shadow-lg"
      transition:fly={{ x: 30 }}
    >
      <div class="flex">
        <span class="material-symbols-outlined mr-2">
          {notification.icon}
        </span>
        <span>{notification.message}</span>
      </div>
    </div>
  {/each}
</div>

<style>
  .notifications {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    margin: 2rem;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: none;
    min-width: 30%;
  }

  .content {
    padding: 10px;
    display: block;
    color: white;
    font-weight: 500;
  }
</style>
