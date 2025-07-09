// NOTE: funzione helper per la gestione centralizzata degli errori HTTP
// Questa funzione invia una risposta JSON con un messaggio di errore personalizzato
// e un codice di stato HTTP (default 500).
// Viene usata nei controller per uniformare la gestione e la risposta degli errori.
const handleHttpError = (res, message = 'Errore interno al server. La tua richiesta non può essere processata in questo momento.', code = 500) => {
  res.status(code).json({
    status: 'error',
    code,
    timestamp: new Date().toISOString(),
    success: false,
    error: message
  })
}

export default handleHttpError
