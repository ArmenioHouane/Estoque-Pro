import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value

  // Liberar recursos públicos e arquivos do sistema
  if (
    path.startsWith('/_next') ||
    path.startsWith('/favicon.ico') ||
    path.startsWith('/public')
  ) {
    return NextResponse.next()
  }

  // Rotas públicas
  const publicRoutes = ['/', '/login', '/signup', '/recovery', '/403']
  const isPublic = publicRoutes.includes(path)

  if (isPublic) {
    if (token) {
      // ✅ Apenas redireciona, sem verificar o JWT (isso será feito no backend)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
