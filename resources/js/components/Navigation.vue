<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Learn Laravel-VueJs</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" exact :to="{ name: 'pages.home'}">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" exact :to="{ name: 'notes.create'}">New Note</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" exact :to="{ name: 'notes.table'}">Table Of Note</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'pages.about' }">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'pages.contact' }">Contact</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {

    }
</script>
