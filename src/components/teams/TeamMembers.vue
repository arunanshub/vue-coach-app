<script setup lang="ts">
import UserItem from '../users/UserItem.vue'
import type { Team, User } from '@/App.vue'
import { inject, onBeforeMount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  teamId: string
}>()
const teamName = ref('')
const teamMembers = ref<User[]>([])
const users = inject<User[]>('users', [])
const teams = inject<Team[]>('teams', [])
const router = useRouter()

function loadTeamMembers(teamId: string) {

  const selectedTeam = teams.find((team) => team.id === teamId)

  // find team. if not found, show teams page
  const members = selectedTeam?.members
  if (!members) {
    router.replace('/teams')
    return
  }

  const selectedMembers = []
  for (const member of members) {
    const selectedMember = users.find((user) => user.id === member)
    if (!selectedMember) {
      router.replace('/users')
      return
    }
    selectedMembers.push(selectedMember)
  }
  teamMembers.value = selectedMembers
  teamName.value = selectedTeam.name
}

onBeforeMount(() => loadTeamMembers(props.teamId))
watch(props, (newProps) => loadTeamMembers(newProps.teamId))
</script>

<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <UserItem v-for="member in teamMembers" :key="member.id" :name="member.fullName" :role="member.role"></UserItem>
    </ul>
    <p>
      <RouterLink to="/teams/t2">Go to team 2</RouterLink>
    </p>
  </section>
</template>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
