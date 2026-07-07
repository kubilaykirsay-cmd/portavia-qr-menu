import { useState, useEffect } from 'react';
import { useWaiterCalls, updateWaiterCallStatus } from '../../data/mockStore';
import { Bell, Check, Trash2, Clock, RefreshCw } from 'lucide-react';

function formatTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

// Global AudioContext cache to prevent garbage collection and browser blocking
let globalAudioCtx = null;

// Initialize or resume the AudioContext
function initAudioContext() {
  try {
    if (!globalAudioCtx) {
      globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume();
    }
  } catch (e) {
    console.warn('Could not initialize AudioContext:', e);
  }
}

// Add click listeners to unlock sound instantly on any admin interaction
if (typeof window !== 'undefined') {
  const unlock = () => {
    initAudioContext();
    window.removeEventListener('click', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('click', unlock);
  window.addEventListener('keydown', unlock);
}

// Synthesize a beautiful "Ding-Dong" double chime sound (high quality bell)
// Synthesize a comprehensive 6-second repeating bell chime (5 rings in sequence)
function playLongChime() {
  try {
    initAudioContext();
    
    if (!globalAudioCtx || globalAudioCtx.state === 'suspended') {
      return;
    }
    
    const now = globalAudioCtx.currentTime;
    
    // Play 5 chimes in sequence, spaced 1.2 seconds apart
    const chimeTimes = [0, 1.2, 2.4, 3.6, 4.8];
    
    chimeTimes.forEach((delay, idx) => {
      const startTime = now + delay;
      // The final chime is slightly higher pitched for a premium finish!
      const baseFreq = idx === 4 ? 988 : 880; // B5 for last chime, A5 for others
      const harmFreq = idx === 4 ? 1237 : 1100;
      const thirdFreq = idx === 4 ? 1482 : 1320;
      
      const dongFreq = idx === 4 ? 784 : 660; // G5 for last chime, E5 for others
      const dongHarm = idx === 4 ? 980 : 825;
      const dongThird = idx === 4 ? 1176 : 990;
      
      // DING
      playSingleRing(baseFreq, startTime, 0.35);
      playSingleRing(harmFreq, startTime, 0.15);
      playSingleRing(thirdFreq, startTime, 0.08);
      
      // DONG (350ms later)
      const dongTime = startTime + 0.35;
      playSingleRing(dongFreq, dongTime, 0.35);
      playSingleRing(dongHarm, dongTime, 0.15);
      playSingleRing(dongThird, dongTime, 0.08);
    });
    
  } catch (e) {
    console.warn('Audio play blocked or Web Audio not supported:', e);
  }
}

// Synthesize a single decaying tone
function playSingleRing(frequency, startTime, volume) {
  if (!globalAudioCtx) return;
  const osc = globalAudioCtx.createOscillator();
  const gainNode = globalAudioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, startTime);
  
  gainNode.gain.setValueAtTime(volume, startTime);
  // Exponential envelope decay over 1.2s
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);
  
  osc.connect(gainNode);
  gainNode.connect(globalAudioCtx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + 1.25);
}

export default function WaiterCallsList() {
  const calls = useWaiterCalls();
  const pendingCalls = calls.filter(c => c.status === 'pending');
  const pendingCount = pendingCalls.length;
  
  const [prevIds, setPrevIds] = useState(() => pendingCalls.map(c => c.id));
  const [audioState, setAudioState] = useState('suspended');

  // Track the audio context state
  useEffect(() => {
    const updateState = () => {
      if (globalAudioCtx) {
        setAudioState(globalAudioCtx.state);
      } else {
        setAudioState('suspended');
      }
    };
    
    updateState();
    const interval = setInterval(updateState, 1000);
    return () => clearInterval(interval);
  }, []);

  // Play sound when a new call ID is detected
  useEffect(() => {
    const currentIds = pendingCalls.map(c => c.id);
    const hasNewCall = currentIds.some(id => !prevIds.includes(id));
    
    if (hasNewCall) {
      playLongChime();
    }
    setPrevIds(currentIds);
  }, [pendingCalls, prevIds]);

  const enableAudio = () => {
    initAudioContext();
    if (globalAudioCtx) {
      setAudioState(globalAudioCtx.state);
      // Play a quick test sound so the user can verify it works
      playLongChime();
    }
  };

  const grouped = {
    pending: pendingCalls,
    completed: calls.filter(c => c.status === 'completed'),
  };

  const handleComplete = (id) => {
    updateWaiterCallStatus(id, 'completed');
  };

  const handleDelete = (id) => {
    updateWaiterCallStatus(id, 'deleted');
  };

  const totalCalls = calls.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Garson Çağrıları</h2>
          <p className="text-sm text-gray-500 mt-0.5">Toplam {pendingCount} aktif çağrı</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Audio Activator Button */}
          <button
            onClick={enableAudio}
            className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer font-bold select-none active:scale-95 ${
              audioState === 'running'
                ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100/70'
                : 'bg-amber-50 border-amber-200 text-amber-700 animate-pulse hover:bg-amber-100/70'
            }`}
            title={audioState === 'running' ? 'Sesli bildirim aktif' : 'Sesli bildirimi aktif etmek için tıklayın'}
          >
            {audioState === 'running' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                <span>🔊 Ses Aktif</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span>🔇 Sesi Etkinleştir</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-400 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Canlı</span>
          </div>
        </div>
      </div>

      {totalCalls === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <Bell className="w-16 h-16 mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-500 mb-1">Henüz garson çağrısı yok</h3>
          <p className="text-sm text-gray-400">Müşterilerden gelen garson çağrıları burada görünecek</p>
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Active Calls */}
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
            <div className="bg-red-50 px-4 py-3 flex items-center justify-between border-b border-red-100">
              <div className="flex items-center gap-2 text-red-800">
                <Bell className="w-5 h-5 animate-bounce" />
                <span className="font-semibold text-sm">Bekleyen Çağrılar</span>
              </div>
              <span className="bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {grouped.pending.length}
              </span>
            </div>

            <div className="p-4 divide-y divide-gray-100 max-h-[calc(100vh-280px)] overflow-y-auto">
              {grouped.pending.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Aktif garson çağrısı bulunmuyor
                </div>
              ) : (
                grouped.pending.map((call) => (
                  <div key={call.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-red-100 border border-red-200 text-red-700 rounded-2xl flex flex-col items-center justify-center font-heading">
                        <span className="text-xs font-semibold leading-none text-red-500 uppercase">Masa</span>
                        <span className="text-2xl font-bold leading-none mt-1">{call.table}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                          <Clock className="w-3 h-3" />
                          <span>Saat: {formatTime(call.createdAt)}</span>
                        </div>
                        <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                          Bekliyor
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleComplete(call.id)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-sm shadow-green-100 flex items-center justify-center"
                        title="Talebi Yanıtla"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(call.id)}
                        className="bg-gray-100 hover:bg-gray-200 hover:text-red-600 text-gray-600 p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Answered/Completed Calls */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5" />
                <span className="font-semibold text-sm">Yanıtlanan Çağrılar</span>
              </div>
              <span className="bg-gray-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {grouped.completed.length}
              </span>
            </div>

            <div className="p-4 divide-y divide-gray-100 max-h-[calc(100vh-280px)] overflow-y-auto">
              {grouped.completed.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Henüz yanıtlanan çağrı yok
                </div>
              ) : (
                grouped.completed.map((call) => (
                  <div key={call.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-100 border border-gray-200 text-gray-500 rounded-2xl flex flex-col items-center justify-center font-heading">
                        <span className="text-xs font-semibold leading-none text-gray-400 uppercase">Masa</span>
                        <span className="text-2xl font-bold leading-none mt-1">{call.table}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                          <Clock className="w-3 h-3" />
                          <span>Saat: {formatTime(call.createdAt)}</span>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                          Tamamlandı
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(call.id)}
                      className="bg-gray-100 hover:bg-gray-200 hover:text-red-600 text-gray-600 p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center"
                      title="Geçmişten Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
