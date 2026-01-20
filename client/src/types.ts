export interface AnalysisResult {
    content_type: 'news' | 'social_media' | 'claim' | 'image_claim' | 'video_claim';
    identified_claims: string[];
    credibility_score: number;
    credibility_level: 'High' | 'Medium' | 'Low' | 'Uncertain';
    risk_indicators: string[];
    analysis_summary: string;
    responsible_ai_notice: string;
    error?: string;
}
