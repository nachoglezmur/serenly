// Ruta del archivo: supabase/functions/zen-response/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Configuración de CORS para permitir que tu frontend llame a esta función
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://nachoglezmur.github.io', // URL de tu frontend
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Maneja la solicitud de "pre-vuelo" que hacen los navegadores para CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Extrae el mensaje del usuario de la solicitud
    const { content } = await req.json()

    // Aquí puedes añadir lógica de IA en el futuro.
    // Por ahora, devolvemos una respuesta sencilla.
    const botResponse = `Recibido: "${content}". Esta es una respuesta real desde una Edge Function de Supabase. ¡Funciona!`

    // Devuelve la respuesta al frontend
    return new Response(
      JSON.stringify({ content: botResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    // Maneja cualquier error inesperado
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }
})