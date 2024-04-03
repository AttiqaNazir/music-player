export type Track = {
  songName: string;
  url: string;
  artistName: string;
  coverArt: string;
};

export type TrackResponse = {
  response: Track[];
};
