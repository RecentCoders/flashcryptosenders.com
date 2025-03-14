import Button from '@/components/ui/button'
import InteractiveElement from '@/components/ui/interactive-element'

// Instead of this:
// <div onClick={handleClick}>Click me</div>

// Use this:
<Button onClick={handleClick}>Click me</Button>

// Or this for div-like elements:
<InteractiveElement onClick={handleClick}>
  Click me
</InteractiveElement>
