const state = {
  isGameRunning: false,
  isGameEnded: false,
  player_name: "",
  whoWon: ""
};
const getters = {
  isGameRunning: state => {
    return state.isGameRunning;
  },
  getPlayerName: state => {
    return state.player_name;
  },
  isGameEnded: state => {
    return state.isGameEnded;
  },
  whoWon: state => {
    return state.whoWon;
  }
};
const actions = {
  change_game_status: ({ commit },payload) => {
    commit("set_game_status",payload);
  },
  end_game: ({ commit }, payload) => {
    commit("end_game", payload);
  },
  restart_game: ({ commit }) => {
    commit("restart_game");
  }
};
const mutations = {
  set_game_status: (state,payload) => {
    state.isGameRunning = !state.isGameRunning;
    state.player_name = !!payload &&  payload
  },
  end_game: (state, payload) => {
    state.isGameEnded = true;
    state.whoWon = payload;
  },
  restart_game: (state) => {
    state.isGameEnded = false;
    state.isGameRunning = true;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
