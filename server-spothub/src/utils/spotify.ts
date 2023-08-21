type SpotifyPlayState = {
  is_playing: boolean;
  device: {
    id: string;
    is_active: boolean;
    name: string;
    volume_percent: number;
    type: string;
  };
  repeate_state: "context" | string;
  shuffle_state: boolean;
};

export const GetPlayState = async (token: string) => {
  const resultState = await fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const state = await resultState.json();

  return state as SpotifyPlayState;
};
