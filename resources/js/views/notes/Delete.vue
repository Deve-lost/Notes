<template>
	<a href="javascript:void(0)" ref="deleteNote" @click="destroyNote" class="">Delete</a>
</template>

<script>
	export default {
		props: ['endpoint'],

		methods: {
			async destroyNote() {
				let q = window.confirm('Are you sure deleted this data?')

				if (q) {
					let response = await axios.delete(`/api/notes/${this.endpoint}/delete`)

					if (response.status == 200) {
						this.$toasted.show(response.data.message, {
							type: 'success',
							duration: 3000
						})

						this.$refs.deleteNote.parentNode.parentNode.remove()
					}

				}
			}
		}
	}
</script>