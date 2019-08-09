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
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  margin: 0 auto;
  min-width: 320px;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 50px;
}
.modal > .message {
  margin: 0;
  margin-bottom: 10px;
}
@media screen and (min-width: 1600px) {
  .modal {
    padding: 2rem 6rem;
  }
}
</style>
