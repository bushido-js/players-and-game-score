<template>
    <div class="">
        <nav>
            <div class="nav nav-tabs mb-2" >
                    <button class="nav-link disable"  @click="currentTab = 'createGame'" :class="[currentTab == 'createGame' ? activeClass : '']"  type="button">Создать Игру</button>
                    <button class="nav-link disable" @click="currentTab = 'createTournament'" :class="[currentTab == 'createTournament' ? activeClass : '']" type="button">Создать Турнир</button>
            </div>
        </nav>
        <div class="tab-content">
            <!-- добавить в вычисляемое свойство -->
            <div class="tab-pane"  :class="[currentTab == 'createGame' ? showAndActiveClass : '']" v-if="currentTab == 'createGame'">
                <GamesContainer/>
            </div>
            <!-- добавить в вычисляемое свойство -->
            <div class="tab-pane" :class="[currentTab == 'createTournament' ? showAndActiveClass : '']"  v-if="currentTab == 'createTournament'">
                <TournamentsContainer/>
            </div>
        </div>
    </div>

</template>

<script>
export default{
    components: {
        TournamentsContainer: () => import('../Tournaments/TournamentsContainer.vue'),
        GamesContainer: () => import('../Games/GamesContainer.vue')
    },
    data() {
        return {
            currentTab: 'createTournament',
            activeClass: 'active',
            showAndActiveClass: 'fade show active',

            isDisabled: true
        }
    },
}

</script>
<style scoped>
    .nav button{
        margin-right: 5px;
    }

</style>