export interface TrackEventInput {
  eventType: string;
  path?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
}
