import { Link } from 'react-router-dom'

export const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    href,
    onClick,
    className = '',
    ...props
}) => {
    const baseClasses = 'font-bold rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105'

    const variants = {
        primary: 'bg-cyan-400 text-blue-900 border-2 border-cyan-300 hover:bg-cyan-300 shadow-lg',
        secondary: 'bg-black text-white border-2 border-gray-300 shadow-lg hover:shadow-xl hover:scale-[1.02]',
        outline: 'border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-blue-900'
    }

    const sizes = {
        small: 'py-2 px-4 text-sm',
        medium: 'py-2 px-6',
        large: 'py-3 px-8 text-lg'
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    if (href) {
        return (
            <Link to={href} className={classes} {...props}>
                {children}
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={classes} {...props}>
            {children}
        </button>
    )
}

export const Card = ({
    children,
    className = '',
    hover = true,
    ...props
}) => {
    const baseClasses = 'bg-white rounded-2xl border-4 border-gray-300 shadow-xl overflow-hidden'
    const hoverClasses = hover ? 'hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]' : ''

    return (
        <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
            {children}
        </div>
    )
}

export const CardHeader = ({
    children,
    gradient,
    className = '',
    ...props
}) => {
    const gradientClasses = gradient || 'bg-gradient-to-br from-blue-500 to-blue-600'

    return (
        <div className={`${gradientClasses} p-4 sm:p-6 text-center ${className}`} {...props}>
            {children}
        </div>
    )
}

export const CardBody = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div className={`p-4 sm:p-6 ${className}`} {...props}>
            {children}
        </div>
    )
}

export const Section = ({
    children,
    id,
    className = '',
    ...props
}) => {
    return (
        <section
            id={id}
            className={`mt-16 md:mt-32 p-6 sm:p-8 md:p-10 rounded-2xl bg-gray-100 border-4 border-gray-300 shadow-xl text-center ${className}`}
            {...props}
        >
            {children}
        </section>
    )
}

export const SectionTitle = ({
    children,
    subtitle,
    className = '',
    ...props
}) => {
    return (
        <div className="text-center mb-12">
            <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase pixel-text mb-4 ${className}`}
                style={{
                    color: 'var(--color-deep-blue)',
                    textShadow: '2px 2px 0 black',
                }}
                {...props}
            >
                {children}
            </h2>
            {subtitle && (
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export const FeatureList = ({ items, bulletColor = 'blue' }) => {
    const bulletColors = {
        green: 'bg-green-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500'
    }

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 ${bulletColors[bulletColor]} rounded-full mt-2 flex-shrink-0`}></div>
                    <p className="text-gray-700">{item}</p>
                </div>
            ))}
        </div>
    )
}
