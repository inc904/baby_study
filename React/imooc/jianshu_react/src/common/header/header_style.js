import styled from 'styled-components'
import logopic from '../../statics/logo.png'
export const HeaderWrapper = styled.div`
  position: relative;
  height: 58px;
  border-bottom: 1px solid #f0f0f0;
`
export const Logo = styled.a.attrs({
  href: '/'
})`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 58px;
  background: url(${logopic});
  background-size: 100% 100%;
`
