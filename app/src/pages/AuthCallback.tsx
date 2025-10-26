import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()
  useEffect(() => {
    // Placeholder: handle auth callback in future (Supabase)
    const timer = setTimeout(() => navigate('/'), 500)
    return () => clearTimeout(timer)
  }, [navigate])
  return (
    <div className="p-4">
      <p className="text-inkMuted">Conectando sua conta...</p>
    </div>
  )
}
