import PropTypes from 'prop-types'
import { Box } from '@mui/joy'
import { SampleCard } from './sample-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Keyboard, Navigation, Pagination } from 'swiper/modules'

export const SampleBrowser = ({ data }) => {

  return (
    <Box sx={{
      width: '100%',
      height: '66vh',
      margin: '8rem auto',
      '.swiper': {
        height: '100%',
        width: '100%',
      },
      '.swiper-slide': {
        width: '450px',
        transition: 'transform 300ms',
        '&:not(.swiper-slide-active)': {
          transform: 'scale(0.9)',
          transition: 'transform 400ms 100ms',
        },
      },
    }}>
      <Swiper
        navigation={ true }
        pagination={{ type: 'fraction' }}
        keyboard={{ enabled: true }}
        spaceBetween={ 24 }
        grabCursor={ true }
        centeredSlides={ true }
        slidesPerView="auto"
        modules={ [Keyboard, Navigation, Pagination] }
        className="sample-browser"
      >
        {
          data.map(row => (
            <SwiperSlide key={ `slide-${ row.id }` }>
              <SampleCard sample={ row.original } />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </Box>
  )
}

SampleBrowser.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
