<script>
export default {
  name: 'ModalSignin',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickCancelHandler() {
      this.$store.commit('TOGGLE_MODAL_SIGNIN')
    }
  },
  render() {
    return this.show ? (
      <div class="modal">
        <button onClick={this.clickCancelHandler}>
          <v-icon style="position:absolute;top:9px;right:9px" color="white">
            mdi-close
          </v-icon>
        </button>
        {this.$slots.default}
      </div>
    ) : null
  }
}
</script>

<style scoped>
body {
  background: #cecece;
}
.modal {
  color: #fff;
  position: absolute;
  top: 55px;
  width: 250px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  min-width: 320px;
}
.modal > .message {
  margin: 0;
  margin-bottom: 10px;
}
</style>
