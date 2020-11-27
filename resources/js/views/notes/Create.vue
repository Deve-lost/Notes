<template>
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header bg-dark text-white">Create New Note</div>
					<div class="card-body">
						<form action="#" method="POST" @submit.prevent="store">
							<div class="form-group">
								<label for="title">Title</label>
								<input type="text" v-model="form.title" id="title" class="form-control">
								<div v-if="theErrors.title" class="md-2 text-danger">{{ theErrors.title[0] }}</div>
							</div>

							<div class="form-group">
								<label for="subject">Subject</label>
								<select v-model="form.subject" id="subject" class="form-control">
									<option v-for="subject in subjects" :key="subject.id" :value="subject.id">
										{{ subject.name }}
									</option>
								</select>
								<div v-if="theErrors.subject" class="md-2 text-danger">{{ theErrors.subject[0] }}</div>

							</div>

							<div class="form-group">
								<label for="description">Description</label>
								<textarea v-model="form.description" id="description" rows="5" class="form-control"></textarea>
								<div v-if="theErrors.description" class="md-2 text-danger">{{ theErrors.description[0] }}</div>
							</div>

							<button class="btn btn-primary d-flex align-items-center" type="submit">
								Save
								<template v-if="loading">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="15px" height="15px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"> <circle cx="84" cy="50" r="10" fill="#efe9e9"> <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate> <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#efe9e9;#dce7c4;#cfccef;#edd6d1;#efe9e9" begin="0s"></animate> </circle><circle cx="16" cy="50" r="10" fill="#efe9e9"> <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate> <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate> </circle><circle cx="50" cy="50" r="10" fill="#edd6d1"> <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate> <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate> </circle><circle cx="84" cy="50" r="10" fill="#cfccef"> <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate> <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate> </circle><circle cx="16" cy="50" r="10" fill="#dce7c4"> <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate> <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate> </circle></svg>
								</template>
							</button>
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
				form: {
					title: '',
					description: '',
					subject: ''
				},
				loading: false,
				subjects: [],
				theErrors: []
			}
		},
		
		mounted() {
			this.getSubject()
		},

		methods: {
			async getSubject() {
				let response = await axios.get('/api/subjects')
				if (response.status == 200) {
					this.subjects = response.data
				}
			},

			async store() {
				this.loading = true

				try {					
					let response = await axios.post('/api/notes/create-new-notes', this.form)

					if (response.status == 200) {
						this.form.title = ""
						this.form.description = ""
						this.form.subject = ""

						this.theErrors = []

						this.$toasted.show(response.data.message, {
							type: 'success',
							duration: 3000
						})
					}

					this.loading = false
				} catch (e) {
					this.$toasted.show("Something went wrong!", {
						type: 'error',
						duration: 3000
					})

					this.theErrors = e.response.data.errors

					this.loading = false
				}
			}
		}

	}
</script>