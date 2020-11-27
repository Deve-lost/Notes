<template>
	<div class="container">
		<div class="card">
			<div class="card-body">
				<h1>{{ note.title }}</h1>
				<p>
					Published : {{ note.published }} - {{ note.subject }}
				</p>
				<hr>
				<span>
					{{ note.description }}
				</span>	
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				note: [],
			}
		},

		mounted() {
			this.getNote()
		},

		methods: {
			async getNote() {
				let { data } = await axios.get('/api/notes/'+ this.$route.params.noteSlug)

				this.note = data.data
			}
		}
	}
</script>