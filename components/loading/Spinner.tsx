/*
  Spinner is a loading action to display on page, use styled-component to Css styles
  Follow: https://github.com/andrej-naumovski/react-suspense-typescript-example
  Styled: https://styled-components.com/docs/api#typescript
*/

import styles from './Spinner.module.scss'

export default function Spinner() {
  return <div className={styles.spinner}></div>
}
