import PropTypes from 'prop-types'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export const Latex = ({ block = false, children = '' }) => {
  if (block) {
    return (
      <BlockMath math={ children } />
    )
  }
  return (
      <InlineMath math={ children } />
  )
}

Latex.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.string,
}
