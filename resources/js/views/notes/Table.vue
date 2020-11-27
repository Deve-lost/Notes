<template>
	<div class="container">
		<div class="card">
			<div class="card-header bg-dark text-white">List Notes</div>
			<div class="card-body">
				<table class="table table-borderd">
					<thead>
						<tr>
							<th>Title</th>
							<th>Subject</th>
							<th>Published</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="note in notes" :key="note.id">
							<td><router-link :to="{ name: 'notes.show', params: { noteSlug: note.slug } }">{{ note.title }}</router-link></td>
							<td>{{ note.subject }}</td>
							<td>{{ note.published }}</td>
							<td>
								<router-link :to="{ name: 'notes.edit', params: { noteSlug: note.slug } }" class="">Edit</router-link> 
								<delete-note :endpoint="note.slug"/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	// Import components
	import DeleteNote from './Delete'

	export default {
		components: {
			DeleteNote
		},

		data() {
			return {
				notes: [],
			}
		},

		mounted() {
			this.getNote()
		},

		methods: {
			async getNote() {
				let { data } = await axios.get('/api/notes')

				this.notes = data.data
			}
		}
	}
</script>