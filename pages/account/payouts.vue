<template>
  <v-app id="tube">
    <v-flex xs12 sm6 offset-sm3>
      <v-layout column fill-height>
        <v-flex>
          <v-card width="100%">
            <v-card-title>
              <h1>Payouts</h1>
            </v-card-title>
            <v-card-text>
              <p v-if="!hasStripeID">
                Before accepting payments, you must configure your payout options.
              </p>
              <p v-if="hasStripeID">
                Your payout options have been configured. Use the button below to check your balance, change your payout configuration, or modify your payout schedule.
              </p>
              <p v-if="hasStripeID">
                Estimated Balance: {{ balance }}
              </p>
            </v-card-text>

            <v-card-actions>
              <connect-button />
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-app>
</template>

<script>
import connectButton from '~/components/connect-button.vue'

export default {
    name: 'Payouts',
    components: {
        'connect-button': connectButton
    },
    data () {
        return {
            stripeConnect: null
        }
    },
    computed: {
        usermeta () {
            return this.$store.state.meta
        },
        balance () {
            const { available } = this.$store.getters['meta/balance']
            return this.$utils.currencyFormat(available[0].amount, available[0].currency)
        },
        hasStripeID () {
            return (this.usermeta && this.usermeta.stripe && this.usermeta.stripe.stripe_user_id)
        }
    },
    mounted () {
        console.log('Stripe URL:', this.stripeURL, this.usermeta.phone)
        console.log('User Balance:', this.usermeta.balance)
    }
}
</script>

<style scoped>
.dont-break {
    font-family: monospace;
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;

}
</style>
