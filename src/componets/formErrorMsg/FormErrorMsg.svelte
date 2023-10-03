<script>
  export let error;
</script>

<div>
  {#if error}
    <span class="text-sm text-red-600 ml-2">{error}</span>
  {/if}
</div>
