<template>
  <v-container fluid class="pa-0">
    <h1 class="contact-title display-1 px-10">Contact Us</h1>
    <v-row no-gutters class="fill-height">
      <!-- Left Section - Contact Form -->
      <v-col cols="12" md="7" class="pa-8 pa-md-12">
        <div class="max-width-form">
          <h1 class="font-weight-light mb-6 text-grey-darken-2">
            Let's Start a Conversation
          </h1>

          <p class="text-body-1 text-grey-darken-1 mb-8 mb-md-12">
            Any suggestions or just a conversation are welcome.  Receive free, immediate updates by email.We're open to suggestions or just chatting.  Receive free updates via email.
          </p>

          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <v-row>
              <!-- Name Field -->
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="form.name"
                    label="Name"
                    :rules="nameRules"
                    class="mb-4"
                    density="comfortable"
                ></v-text-field>
              </v-col>

              <!-- Email Field -->
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="form.email"
                    label="Email"
                    :rules="emailRules"
                    class="mb-4"
                    density="comfortable"
                ></v-text-field>
              </v-col>

              <!-- Phone Field -->
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="form.phone"
                    label="Phone"
                    class="mb-4"
                    density="comfortable"
                ></v-text-field>
              </v-col>

              <!-- Subject Field -->
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="form.subject"
                    label="Subject"
                    class="mb-4"
                    density="comfortable"
                ></v-text-field>
              </v-col>

              <!-- Message Field -->
              <v-col cols="12">
                <v-textarea
                    v-model="form.message"
                    label="Message"
                    rows="6"
                    class="mb-6"
                    density="comfortable"
                ></v-textarea>
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-btn
                type="submit"
                color="amber-darken-3"
                size="large"
                class="text-white px-8 py-3"
                :loading="loading"
                :disabled="!valid"
            >
              SEND MESSAGE
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-form>
        </div>
      </v-col>

      <!-- Right Section - Contact Info -->
      <v-col cols="12" md="5" class="contact-info-section pa-8 pa-md-12">
        <div class="contact-info-content">
          <h2 class="text-h4 font-weight-light mb-6 mb-md-8 text-grey-darken-2">
            Get in Touch
          </h2>

          <p class="text-body-1 text-grey-darken-1 mb-8 mb-md-12">
            We're open for any suggestion or just to have a chat. Get instant updates free
            via email
          </p>

          <!-- Address -->
          <div class="contact-item mb-8 mb-md-10">
            <div class="d-flex align-start">
              <v-icon color="grey-darken-2" class="mr-4 mt-1">mdi-map-marker</v-icon>
              <div>
                <p class="text-overline font-weight-bold text-grey-darken-2 mb-2">ADDRESS</p>
                <p class="text-body-1 text-grey-darken-1 mb-1">892 Park Avenue, Manhattan</p>
                <p class="text-body-1 text-grey-darken-1">New York, NY 10075</p>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="contact-item">
            <div class="d-flex align-start">
              <v-icon color="grey-darken-2" class="mr-4 mt-1">mdi-email</v-icon>
              <div>
                <p class="text-overline font-weight-bold text-grey-darken-2 mb-2">EMAIL</p>
                <p class="text-body-1 text-grey-darken-1">hello@businessdemo.com</p>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      valid: false,
      loading: false,
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 2) || 'Name must be at least 2 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ]
    }
  },
  methods: {
    async submitForm() {
      if (this.valid) {
        this.loading = true;

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Handle form submission here
          console.log('Form submitted:', this.form);

          // Reset form
          this.$refs.form.reset();

          // Show success message (you can customize this)
          this.$emit('form-submitted', this.form);

        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  }
}
</script>

<style scoped>
.max-width-form {
  max-width: 600px;
}

.contact-title {
  font-family: 'Georgia', serif;
  font-weight: 300;
  color: #333;
  margin-bottom: 20px;
}

.contact-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: #FFA000;
  margin-top: 10px;
}

.contact-info-section {
  background-color: #f8f9fa;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contact-info-content {
  flex: 1;
}

.contact-item {
  border-left: 3px solid transparent;
  padding-left: 0;
  transition: all 0.3s ease;
}

.contact-item:hover {
  border-left-color: #424242;
  padding-left: 8px;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .contact-info-section {
    min-height: auto;
  }

  .activation-notice {
    position: relative;
    bottom: auto;
    right: auto;
    text-align: left;
    margin-top: 32px;
  }
}

/* Custom field styling */
:deep(.v-field__label) {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

:deep(.v-field__input) {
  padding-top: 16px;
}

:deep(.v-text-field .v-field) {
  border-radius: 4px;
}

:deep(.v-textarea .v-field) {
  border-radius: 4px;
}

/* Button styling */
:deep(.v-btn) {
  border-radius: 4px;
  letter-spacing: 0.05em;
}
</style>