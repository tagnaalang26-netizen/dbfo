import { Link } from '@inertiajs/react';
import { ArrowUpRight, Layers3, LockKeyhole } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function LoginLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <main className="login-page">
            <section className="login-story" aria-label="Welcome to DFBO">
                <Link
                    href={home()}
                    className="login-brand"
                    aria-label="DFBO home"
                >
                    <span className="login-brand-mark">
                        <Layers3 size={23} />
                    </span>
                    DFBO
                    <span className="login-brand-caption">YOUR WORKSPACE</span>
                </Link>

                <div className="login-story-copy">
                    <p className="login-eyebrow">
                        <span /> A LITTLE FOCUS. A FRESH START.
                    </p>
                    <h2>
                        Good things <br />
                        start <em>here.</em>
                    </h2>
                    <p>
                        Your space to get things moving.
                        <br />
                        Sign in and pick up where you left off.
                    </p>
                </div>

                <div className="login-orbit-scene" aria-hidden="true">
                    <div className="login-orbit login-orbit-outer">
                        <span />
                    </div>
                    <div className="login-orbit login-orbit-inner">
                        <span />
                    </div>
                    <div className="login-orbit-core">
                        <Layers3 strokeWidth={1} />
                    </div>
                    <div className="login-floating-note">
                        <span className="login-note-dot" /> Everything, in one
                        place.
                        <ArrowUpRight size={17} />
                    </div>
                </div>

                <div className="login-story-footer">
                    <span>A clearer way forward.</span>
                    <span>DFBO / 01</span>
                </div>
            </section>

            <section className="login-form-panel" aria-labelledby="login-title">
                <div className="login-form-content">
                    <div className="login-heading">
                        <span className="login-form-kicker">
                            LET’S GET YOU SETTLED IN
                        </span>
                        <h1 id="login-title">{title}</h1>
                        <p>{description}</p>
                    </div>
                    {children}
                    <p className="login-security-note">
                        <LockKeyhole size={14} /> Your workspace. Your secure
                        sign-in.
                    </p>
                </div>
                <p className="login-panel-footer">
                    A fresh start is one sign-in away.
                </p>
            </section>
        </main>
    );
}
