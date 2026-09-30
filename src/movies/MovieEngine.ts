export class MovieEngine {
  private currentMovie: any = null;
  private movies: Map<string, any> = new Map();
  private isPlaying: boolean = false;

  async loadMovie(name: string, url: string): Promise<void> {
    console.log(`Loading movie: ${name}`);
    const movie = {
      name,
      url,
      duration: 0,
      captions: [],
      audioDescriptions: [],
    };
    this.movies.set(name, movie);
  }

  async loadCaptions(movieName: string, captionUrl: string): Promise<void> {
    const movie = this.movies.get(movieName);
    if (!movie) return;
    const response = await fetch(captionUrl);
    const captionData = await response.json();
    movie.captions = captionData;
  }

  async loadAudioDescriptions(movieName: string, descriptionsUrl: string): Promise<void> {
    const movie = this.movies.get(movieName);
    if (!movie) return;
    const response = await fetch(descriptionsUrl);
    const descriptionData = await response.json();
    movie.audioDescriptions = descriptionData;
  }

  playMovie(name: string): void {
    this.currentMovie = this.movies.get(name);
    if (!this.currentMovie) {
      console.error(`Movie not found: ${name}`);
      return;
    }
    this.isPlaying = true;
    console.log(`Playing movie: ${name}`);
  }

  pauseMovie(): void {
    this.isPlaying = false;
  }

  stopMovie(): void {
    this.isPlaying = false;
    this.currentMovie = null;
  }

  getCaptionsAtTime(time: number): string[] {
    if (!this.currentMovie || !this.currentMovie.captions) return [];
    return this.currentMovie.captions
      .filter((c: any) => c.startTime <= time && time <= c.endTime)
      .map((c: any) => c.text);
  }
}
