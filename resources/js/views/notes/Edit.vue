<template>
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header bg-dark text-white">Create New Note</div>
					<div class="card-body">
						<form action="#" method="POST" @submit.prevent="update">
							<div class="form-group">
								<label for="title">Title</label>
								<input type="text" v-model="form.title" id="title" class="form-control">
								<div v-if="theErrors.title" class="md-2 text-danger">{{ theErrors.title[0] }}</div>
							</div>

							<div class="form-group">
								<label for="subject">Subject</label>
								<select @change="selectedSubject" id="subject" class="form-control">
									<option :value="form.subjectId" v-text="form.subject"></option>
									
									<template v-for="subject in subjects">
										<option v-if="form.subjectId !== subject.id" :key="subject.id" :value="subject.id">
											{{ subject.name }}
										</option>
									</template>
								</select>
								<div v-if="theErrors.subject" class="md-2 text-danger">{{ theErrors.subject[0] }}</div>

							</div>

							<div class="form-group">
								<label for="description">Description</label>
								<textarea v-model="form.description" id="description" rows="5" class="form-control"></textarea>
								<div v-if="theErrors.description" class="md-2 text-danger">{{ theErrors.description[0] }}</div>
							</div>

							<button class="btn btn-primary" type="submit">Update</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: [],
				subjects: [],
				theErrors: [],
				selected: '',
			}
		},

		mounted() {
			this.getSubject()
			this.getNote()
		},

		methods: {
			async getSubject() {
				let response = await axios.get('/api/subjects')

				if (response.status == 200) {
					this.subjects = response.data
				}
			},

			async getNote() {
				let response = await axios.get(`/api/notes/${this.$route.params.noteSlug}`)

				this.form = response.data.data

			},

			async selectedSubject(e) {
				this.selected = e.target.value
			},

			async update() {
				this.form['subject'] = this.selected || this.form.subjectId

				let response = await axios.patch(`/api/notes/${this.$route.params.noteSlug}/edit`, this.form)

				if (response.status == 200) {
					this.$toasted.show(response.data.message, {
						type: 'success',
						duration: 3000
					})

					this.$router.push('/notes/table')
				}
			}
		}
	}
</script>