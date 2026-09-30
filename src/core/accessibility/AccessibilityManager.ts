export interface AccessibilityOptions {
  enableCaptions: boolean;
  enableSubtitles: boolean;
  enableAudioDescriptions: boolean;
  enableScreenReader: boolean;
  enableColorBlindMode: boolean;
  enableHighContrast: boolean;
  textSize: 'small' | 'normal' | 'large' | 'extra-large';
  colorBlindType: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
}

export class AccessibilityManager {
  private options: AccessibilityOptions = {
    enableCaptions: false,
    enableSubtitles: false,
    enableAudioDescriptions: false,
    enableScreenReader: false,
    enableColorBlindMode: false,
    enableHighContrast: false,
    textSize: 'normal',
    colorBlindType: 'protanopia',
  };

  private captionDisplay: HTMLElement | null = null;
  private subtitleDisplay: HTMLElement | null = null;

  initialize(): void {
    this.setupAccessibilityUI();
    this.loadAccessibilityPreferences();
    console.log('Accessibility Manager initialized');
  }

  private setupAccessibilityUI(): void {
    this.captionDisplay = document.createElement('div');
    this.captionDisplay.id = 'caption-display';
    this.captionDisplay.setAttribute('role', 'region');
    this.captionDisplay.setAttribute('aria-live', 'polite');
    document.body.appendChild(this.captionDisplay);

    this.subtitleDisplay = document.createElement('div');
    this.subtitleDisplay.id = 'subtitle-display';
    this.subtitleDisplay.setAttribute('role', 'region');
    this.subtitleDisplay.setAttribute('aria-live', 'polite');
    document.body.appendChild(this.subtitleDisplay);
  }

  displayCaption(text: string): void {
    if (!this.options.enableCaptions || !this.captionDisplay) return;
    this.captionDisplay.textContent = text;
  }

  displaySubtitle(text: string): void {
    if (!this.options.enableSubtitles || !this.subtitleDisplay) return;
    this.subtitleDisplay.textContent = text;
  }

  setOptions(options: Partial<AccessibilityOptions>): void {
    this.options = { ...this.options, ...options };
    this.applyAccessibilitySettings();
    this.saveAccessibilityPreferences();
  }

  private applyAccessibilitySettings(): void {
    const root = document.documentElement;
    const fontSizeMap: Record<string, string> = {
      'small': '12px',
      'normal': '16px',
      'large': '20px',
      'extra-large': '24px',
    };
    root.style.fontSize = fontSizeMap[this.options.textSize];

    if (this.options.enableHighContrast) {
      root.style.filter = 'contrast(1.5)';
    } else {
      root.style.filter = 'none';
    }
  }

  getOptions(): AccessibilityOptions {
    return { ...this.options };
  }

  private saveAccessibilityPreferences(): void {
    localStorage.setItem('a11y-preferences', JSON.stringify(this.options));
  }

  private loadAccessibilityPreferences(): void {
    const saved = localStorage.getItem('a11y-preferences');
    if (saved) {
      const preferences = JSON.parse(saved);
      this.options = { ...this.options, ...preferences };
      this.applyAccessibilitySettings();
    }
  }
}
