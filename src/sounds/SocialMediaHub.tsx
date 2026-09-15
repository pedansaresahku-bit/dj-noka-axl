import React from 'react';
import { ExternalLink, Instagram, MessageCircle, Share2, CheckCircle2 } from 'lucide-react';
import { ARTIST_INFO } from '../data/djData';

export const SocialMediaHub: React.FC = () => {
  const socialChannels = [
    {
      name: 'INSTAGRAM',
      handle: '@nokaaxlofficial',
      url: ARTIST_INFO.socialLinks.instagram,
      description: 'Dokumentasi live tour harian, story backstage, dan jadwal perform.',
      badge: 'Official Account',
      color: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
      borderHover: 'hover:border-[#fd1d1d]/60',
      icon: <Instagram className="w-6 h-6 text-white" />,
      cta: 'Follow di Instagram',
    },
    {
      name: 'TIKTOK',
      handle: '@nokaaxlofficial',
      url: ARTIST_INFO.socialLinks.tiktok,
      description: 'Sound breakbeat viral, remix FYP, dan cuplikan panggung energik.',
      badge: 'Trending Audio',
      color: 'from-[#00f2fe] to-[#4facfe]',
      borderHover: 'hover:border-[#00f2fe]/60',
      icon: (
        <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      cta: 'Follow di TikTok',
    },
    {
      name: 'SPOTIFY',
      handle: 'NOKA AXL',
      url: ARTIST_INFO.socialLinks.spotify,
      description: 'Diskografi resmi lagu original mix, kolaborasi, dan EP rilis.',
      badge: 'Verified Artist',
      color: 'from-[#1DB954] to-[#191414]',
      borderHover: 'hover:border-[#1DB954]/60',
      icon: (
        <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
      cta: 'Dengarkan di Spotify',
    },
    {
      name: 'SOUNDCLOUD',
      handle: 'nk-bounce',
      url: ARTIST_INFO.socialLinks.soundCloud,
      description: 'Mixtape live set 60 menit nonstop & unreleased Breakbeat bootlegs.',
      badge: 'Pro Unlimited',
      color: 'from-[#FF5500] to-[#ff2200]',
      borderHover: 'hover:border-[#FF5500]/60',
      icon: (
        <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M1.175 12.225c-.051 0-.094.045-.101.1l-.297 3.322.297 3.203c.007.055.05.097.101.097.056 0 .098-.042.105-.097l.329-3.203-.329-3.322c-.007-.055-.049-.1-.105-.1zm1.26-1.328c-.066 0-.12.053-.126.121l-.32 4.673.32 4.432c.006.068.06.121.126.121.069 0 .123-.053.13-.121l.361-4.432-.361-4.673c-.007-.068-.061-.121-.13-.121zm1.365-1.026c-.08 0-.144.065-.152.146l-.286 5.679.286 5.419c.008.081.072.146.152.146.082 0 .148-.065.155-.146l.334-5.419-.334-5.679c-.007-.081-.073-.146-.155-.146zm1.442-.455c-.092 0-.166.075-.175.168l-.248 6.134.248 5.86c.009.093.083.168.175.168.094 0 .169-.075.178-.168l.295-5.86-.295-6.134c-.009-.093-.084-.168-.178-.168zm1.503-.049c-.104 0-.188.085-.197.191l-.206 6.183.206 5.908c.009.106.093.191.197.191.107 0 .191-.085.2-.191l.259-5.908-.259-6.183c-.009-.106-.093-.191-.2-.191zm1.564-.078c-.116 0-.21.096-.22.213l-.161 6.261.161 5.986c.01.117.104.213.22.213.118 0 .212-.096.222-.213l.217-5.986-.217-6.261c-.01-.117-.104-.213-.222-.213zm1.613.189c-.127 0-.23.106-.241.235l-.112 6.072.112 5.797c.011.129.114.235.241.235.129 0 .232-.106.243-.235l.176-5.797-.176-6.072c-.011-.129-.114-.235-.243-.235zm1.644.606c-.137 0-.248.114-.26.253l-.062 5.466.062 5.191c.012.139.123.253.26.253.14 0 .251-.114.263-.253l.136-5.191-.136-5.466c-.012-.139-.123-.253-.263-.253zm1.644.757c-.146 0-.265.122-.278.27l-.011 4.709.011 4.434c.013.148.132.27.278.27.149 0 .268-.122.281-.27l.095-4.434-.095-4.709c-.013-.148-.132-.27-.281-.27zm6.758 1.492c-.382 0-.749.076-1.084.214-.275-2.455-2.361-4.364-4.896-4.364-.53 0-1.037.086-1.512.245l-.089 7.747.089 2.055c.475.159.982.245 1.512.245 2.535 0 4.621-1.909 4.896-4.364.335.138.702.214 1.084.214 1.637 0 2.964-1.327 2.964-2.964s-1.327-2.964-2.964-2.964z"/>
        </svg>
      ),
      cta: 'Stream di SoundCloud',
    },
    {
      name: 'YOUTUBE',
      handle: '@NokaAxL',
      url: ARTIST_INFO.socialLinks.youtube,
      description: 'Official stage videos, festival recaps, aftermovies, dan set rekaman.',
      badge: 'Official Artist Channel',
      color: 'from-[#FF0000] to-[#282828]',
      borderHover: 'hover:border-[#FF0000]/60',
      icon: (
        <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      cta: 'Subscribe di YouTube',
    },
    {
      name: 'WHATSAPP MANAGEMENT',
      handle: 'Kak Dina (Manager)',
      url: ARTIST_INFO.whatsappUrl,
      description: 'Official direct booking, riders teknis, schedule check, dan rate card.',
      badge: 'Direct Management',
      color: 'from-[#10b981] to-[#047857]',
      borderHover: 'hover:border-emerald-500/60',
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      cta: 'Chat WhatsApp (+62 819-0777-9998)',
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono tracking-widest uppercase mb-3 shadow-volt-sm">
          <Share2 className="w-3.5 h-3.5" />
          <span>ALL OFFICIAL CHANNELS</span>
        </div>
        <h3 className="font-kanit font-black text-2xl sm:text-4xl text-white uppercase tracking-wider">
          CONNECT DENGAN DJ NOKA AXL
        </h3>
        <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2">
          Ikuti semua platform streaming, video rekaman, dan media sosial resmi untuk update rilisan terbaru dan jadwal festival.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialChannels.map((channel) => (
          <div
            key={channel.name}
            className={`p-6 rounded-3xl bg-[#0E0E14] border border-white/10 ${channel.borderHover} transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between group relative overflow-hidden`}
          >
            {/* Top gradient glow on hover */}
            <div className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${channel.color}`} />

            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${channel.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                  {channel.icon}
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300 uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 text-volt" />
                  {channel.badge}
                </span>
              </div>

              <h4 className="font-kanit font-black text-lg text-white uppercase tracking-wide group-hover:text-volt transition-colors">
                {channel.name}
              </h4>
              <p className="text-xs font-mono text-volt tracking-wider font-semibold mb-2">
                {channel.handle}
              </p>
              <p className="text-xs text-slate-400 font-mono leading-relaxed mb-6">
                {channel.description}
              </p>
            </div>

            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-white/5 hover:bg-volt hover:text-black border border-white/10 hover:border-volt text-white font-kanit font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 group-hover:shadow-[0_0_20px_rgba(255,208,0,0.3)]"
            >
              <span>{channel.cta}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
