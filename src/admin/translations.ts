// 번역 파일 - 모든 UI 텍스트의 다국어 지원
// File dịch - hỗ trợ đa ngôn ngữ cho tất cả văn bản UI
// Translation file - multilingual support for all UI text

export type Language = 'vi' | 'ko' | 'en';

export interface CommonTranslations {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    view: string;
    search: string;
    filter: string;
    export: string;
    import: string;
    refresh: string;
    loading: string;
    noData: string;
    confirm: string;
    close: string;
    success: string;
    error: string;
}

export interface Translations {
    // Navigation / Điều hướng / 탐색
    nav: {
        dashboard: string;
        bookings: string;
        clubs: string;
        teeTimeRules: string;
        slotManagement: string;
        users: string;
        reports: string;
        inventory: string;
        finance: string;
        settings: string;
        logout: string;
        groupGolf: string;
        groupAdmin: string;
        managers: string;
    };
    managers: {
        title: string;
        subtitle: string;
        addBtn: string;
        tableName: string;
        tableContact: string;
        tableCourses: string;
        tableActions: string;
        modalTitle: string;
        labelName: string;
        labelPhone: string;
        labelEmail: string;
        labelPassword: string;
        labelAssign: string;
        btnCancel: string;
        btnConfirm: string;
        empty: string;
        assignedStatus: string;
    };
    // Dashboard / Bảng điều khiển / 대시보드
    dashboard: {
        title: string;
        subtitle: string;
        aiInsights: string;
        analyzing: string;
        exportReport: string;
        performanceAnalysis: string;
        totalRevenue: string;
        totalBookings: string;
        brokerCommission: string;
        activeCourses: string;
        revenueAnalytics: string;
        revenueSubtitle: string;
        revenue: string;
        commission: string;
        liveActivity: string;
        viewAll: string;
        justNow: string;
        minutesAgo: string;
        booked: string;
        modifiedReservation: string;
        paidInvoice: string;
    };

    // Bookings / Đặt chỗ / 예약
    bookings: {
        title: string;
        subtitle: string;
        addBooking: string;
        exportData: string;
        searchPlaceholder: string;
        filterAll: string;
        filterConfirmed: string;
        filterPending: string;
        filterCancelled: string;
        tableId: string;
        tableBookingTime: string;
        tableCustomer: string;
        tableCourse: string;
        tableDate: string;
        tableSlot: string;
        tablePlayers: string;
        tablePrice: string;
        tableStatus: string;
        tablePayment: string;
        tableActions: string;
        statusConfirmed: string;
        statusPending: string;
        statusCancelled: string;
        paymentPaid: string;
        paymentPending: string;
        actionView: string;
        actionEdit: string;
        actionCancel: string;
        modalTitle: string;
        modalNoPhone: string;
        modalPrint: string;
        modalClose: string;
    };

    // Clubs / Sân golf / 골프장
    clubs: {
        title: string;
        subtitle: string;
        addClub: string;
        searchPlaceholder: string;
        viewDetails: string;
        editClub: string;
        filterAll: string;
        totalHoles: string;
        holes: string;
        par: string;
        rating: string;
        avgRating: string;
        reviews: string;
        bookingsToday: string;
        amenities: string;
        statusMaintenance: string;
        quickFilter: string;
        clubhouse: string;
        proShop: string;
        restaurant: string;
        drivingRange: string;
        puttingGreen: string;
        caddies: string;
        carts: string;
        lockers: string;
    };

    // Users / Người dùng / 사용자
    users: {
        title: string;
        subtitle: string;
        addUser: string;
        exportUsers: string;
        searchPlaceholder: string;
        filterAll: string;
        filterAdmin: string;
        filterBroker: string;
        filterGolfer: string;
        totalUsers: string;
        activeAdmins: string;
        managers: string;
        pendingInvites: string;
        userProfile: string;
        noChange: string;
        actionNeeded: string;
        tableId: string;
        tableName: string;
        tableEmail: string;
        tableRole: string;
        tableBookings: string;
        tableRevenue: string;
        tableJoined: string;
        tableActions: string;
        roleAdmin: string;
        roleBroker: string;
        roleGolfer: string;
        roleStaff: string;
        actionView: string;
        actionEdit: string;
        actionDelete: string;
    };

    // Slots / Quản lý slot / 슬롯 관리
    slots: {
        title: string;
        subtitle: string;
        createSlot: string;
        bulkUpload: string;
        selectCourse: string;
        selectDate: string;
        timeSlot: string;
        capacity: string;
        booked: string;
        price: string;
        status: string;
        actions: string;
        statusAvailable: string;
        statusLimited: string;
        statusFull: string;
        statusClosed: string;
        actionEdit: string;
        actionClose: string;
        actionOpen: string;
    };

    // Tee Time Rules / Quy tắc Tee Time / 티타임 규칙
    teeTimeRules: {
        title: string;
        subtitle: string;
        addRule: string;
        editRule: string;
        startTime: string;
        endTime: string;
        interval: string;
        maxPlayers: string;
        applyDays: string;
        status: string;
        active: string;
        inactive: string;
        generateSlots: string;
        generateButton: string;
        startDate: string;
        endDate: string;
        successGenerate: string;
        confirmDelete: string;
        noRules: string;
        days: {
            mon: string;
            tue: string;
            wed: string;
            thu: string;
            fri: string;
            sat: string;
            sun: string;
        };
    };

    // Reports / Báo cáo / 보고서
    reports: {
        inventory: string;
        stats: string;
    };

    // Header / Tiêu đề / 헤더
    header: {
        breadcrumb: string;
        searchPlaceholder: string;
        notifications: string;
        adminName: string;
        adminRole: string;
    };

    // Manager Specific Translations
    manager: {
        nav: {
            teeSheet: string;
            staff: string;
            pricing: string;
            courses: string;
            reports: string;
            settings: string;
            logout: string;
            adminPortal: string;
        };
        header: {
            teeSheetTitle: string;
            staffTitle: string;
            pricingTitle: string;
            courseTitle: string;
            teeSheetSub: string;
            staffSub: string;
            pricingSub: string;
            courseSub: string;
            occupancy: string;
            revenue: string;
            newBooking: string;
            daily: string;
            weekly: string;
            list: string;
            searchPlayer: string;
        };
        staff: {
            searchPlaceholder: string;
            filter: string;
            export: string;
            tableUser: string;
            tableRole: string;
            tablePermissions: string;
            tableStatus: string;
            tableActions: string;
            statusActive: string;
            statusInactive: string;
            showingEntries: string;
            previous: string;
            next: string;
            activityLog: string;
            viewAll: string;
        };
        teeSheet: {
            legendConfirmed: string;
            legendPending: string;
            legendBlocked: string;
            lastUpdated: string;
            resources: string;
            unpaid: string;
            mowing: string;
            totalBookings: string;
            checkedIn: string;
            capacityLabel: string;
            nextTeeTime: string;
            inMinutes: string;
            autoRefresh: string;
            searchPlaceholder: string;
            allBookings: string;
            holes18: string;
            holes9: string;
            cartsOnly: string;
            vipMembers: string;
            tableTeeTime: string;
            tablePlayerName: string;
            tableDetails: string;
            tableRefId: string;
            tablePayment: string;
            tableStatus: string;
            tableActions: string;
            single: string;
            guests: string;
        };
        pricing: {
            title: string;
            subtitle: string;
            today: string;
            tomorrow: string;
            selectDates: string;
            unsavedChanges: string;
            unsavedSubtitle: string;
            discard: string;
            saveAll: string;
            tableTimeSlot: string;
            tableBaseRate: string;
            tablePartnerNet: string;
            tablePlatformFee: string;
            tableCustomerPrice: string;
            tableActions: string;
            closed: string;
            summaryTitle: string;
            avgBaseRate: string;
            lowestPrice: string;
            highestPrice: string;
            overridesTitle: string;
            addOverride: string;
        };
        course: {
            title: string;
            subtitle: string;
            draft: string;
            viewListing: string;
            generalInfo: string;
            courseName: string;
            aboutCourse: string;
            aboutPlaceholder: string;
            numHoles: string;
            holes9: string;
            holes18: string;
            holes36: string;
            par: string;
            operations: string;
            openingHours: string;
            to: string;
            cancelPolicy: string;
            publishing: string;
            publishChanges: string;
            saveDraft: string;
            lastSaved: string;
            photos: string;
            uploadLabel: string;
            uploadHint: string;
            uploading: string;
            proTip: string;
            proShopManager: string;
            address: string;
            maxPlayers: string;
            player: string;
            players: string;
            region: string;
            hanoi: string;
            daNang: string;
            hoChiMinh: string;
            weekdayPrice: string;
            weekendPrice: string;
            teeTimes: string;
            addTime: string;
            courseList: string;
            addNewCourse: string;
            refresh: string;
            searchPlaceholder: string;
            filterRegion: string;
            filterHoles: string;
            filterMaxPlayers: string;
            filterPriceRange: string;
            all: string;
            under2M: string;
            between2M3M: string;
            between3M4M: string;
            over4M: string;
            notAvailable: string;
            noCoursesFound: string;
            uploadingImages: string;
            courseUpdatedSuccess: string;
            coursePublished: string;
            draftSaved: string;
            pleaseUploadImage: string;
            failedToLoadCourses: string;
            errorOccurred: string;
            processing: string;
            weekday: string;
            weekend: string;
            maxPlayersLabel: string;
            holesLabel: string;
            enterCourseName: string;
            enterAddress: string;
            enterWeekdayPrice: string;
            enterWeekendPrice: string;
            deleteCourse: string;
            confirmDeleteTitle: string;
            confirmDeleteMessage: string;
            confirmDeleteWarning: string;
            courseDeletedSuccess: string;
            deleteFailed: string;
            status: string;
            active: string;
            inactive: string;
            saveChanges: string;
        };
        common: CommonTranslations;
    };
    // Common / Chung / 공통
    common: CommonTranslations;
}

export const translations: Record<Language, Translations> = {
    vi: {
        nav: {
            dashboard: 'Bảng điều khiển',
            bookings: 'Đặt chỗ',
            clubs: 'Sân Golf',
            teeTimeRules: 'Quy tắc Tee Time',
            slotManagement: 'Quản lý Slot',
            users: 'Người dùng',
            reports: 'Báo cáo',
            inventory: 'Kho hàng',
            finance: 'Tài chính',
            settings: 'Cài đặt',
            logout: 'Đăng xuất',
            groupGolf: 'Điều hành Sân Golf',
            groupAdmin: 'Quản trị Hệ thống',
            managers: 'Quản lý tài khoản',
        },
        managers: {
            title: 'Quản lý tài khoản',
            subtitle: 'Tạo tài khoản và gán quyền quản lý sân golf',
            addBtn: 'Thêm tài khoản',
            tableName: 'Họ tên',
            tableContact: 'Email / SĐT',
            tableCourses: 'Sân đã gán',
            tableActions: 'Hành động',
            modalTitle: 'Tạo tài khoản mới',
            labelName: 'Họ tên',
            labelPhone: 'Số điện thoại',
            labelEmail: 'Email',
            labelPassword: 'Mật khẩu',
            labelAssign: 'Gán Sân Golf',
            btnCancel: 'Hủy',
            btnConfirm: 'Xác nhận tạo',
            empty: 'Chưa có tài khoản nào',
            assignedStatus: 'Đang xử lý...'
        },
        dashboard: {
            title: 'Tổng quan Bảng điều khiển',
            subtitle: 'Số liệu hiệu suất và hoạt động thời gian thực cho hôm nay.',
            aiInsights: 'Phân tích AI',
            analyzing: 'Đang phân tích...',
            exportReport: 'Xuất báo cáo',
            performanceAnalysis: 'Phân tích hiệu suất',
            totalRevenue: 'Tổng doanh thu',
            totalBookings: 'Tổng đặt chỗ',
            brokerCommission: 'Hoa hồng môi giới',
            activeCourses: 'Sân đang hoạt động',
            revenueAnalytics: 'Phân tích doanh thu',
            revenueSubtitle: 'Thu nhập vs Hoa hồng trong 8 kỳ gần nhất',
            revenue: 'Doanh thu',
            commission: 'Hoa hồng',
            liveActivity: 'Hoạt động trực tiếp',
            viewAll: 'Xem tất cả',
            justNow: 'Vừa xong',
            minutesAgo: 'phút trước',
            booked: 'đã đặt',
            modifiedReservation: 'đã sửa đặt chỗ',
            paidInvoice: 'đã thanh toán hóa đơn',
        },
        bookings: {
            title: 'Quản lý Đặt chỗ',
            subtitle: 'Xem và quản lý tất cả đặt chỗ sân golf',
            addBooking: 'Thêm đặt chỗ',
            exportData: 'Xuất dữ liệu',
            searchPlaceholder: 'Tìm kiếm theo tên khách hàng hoặc mã đặt chỗ...',
            filterAll: 'Tất cả',
            filterConfirmed: 'Đã xác nhận',
            filterPending: 'Chờ xử lý',
            filterCancelled: 'Đã hủy',
            tableId: 'ID',
            tableBookingTime: 'Thời gian đặt',
            tableCustomer: 'Khách hàng',
            tableCourse: 'Sân golf',
            tableDate: 'Ngày',
            tableSlot: 'Giờ chơi',
            tablePlayers: 'Người chơi',
            tablePrice: 'Giá',
            tableStatus: 'Trạng thái',
            tablePayment: 'Thanh toán',
            tableActions: 'Hành động',
            statusConfirmed: 'Đã xác nhận',
            statusPending: 'Chờ xử lý',
            statusCancelled: 'Đã hủy',
            paymentPaid: 'Đã thanh toán',
            paymentPending: 'Chờ thanh toán',
            actionView: 'Xem',
            actionEdit: 'Sửa',
            actionCancel: 'Hủy',
            modalTitle: 'Chi tiết đặt chỗ',
            modalNoPhone: 'Không có SĐT',
            modalPrint: 'In hóa đơn',
            modalClose: 'Đóng',
        },
        clubs: {
            title: 'Quản lý Sân Golf',
            subtitle: 'Quản lý thông tin và cài đặt sân golf',
            addClub: 'Thêm sân golf',
            searchPlaceholder: 'Tìm kiếm sân golf...',
            viewDetails: 'Xem chi tiết',
            editClub: 'Chỉnh sửa',
            filterAll: 'Tất cả',
            totalHoles: 'Tổng số hố',
            holes: 'hố',
            par: 'Par',
            rating: 'Đánh giá',
            avgRating: 'Trung bình',
            reviews: 'đánh giá',
            bookingsToday: 'Đặt chỗ hôm nay',
            amenities: 'Tiện ích',
            statusMaintenance: 'Bảo trì',
            quickFilter: 'Lọc nhanh',
            clubhouse: 'Nhà câu lạc bộ',
            proShop: 'Cửa hàng chuyên nghiệp',
            restaurant: 'Nhà hàng',
            drivingRange: 'Sân tập',
            puttingGreen: 'Sân tập gạt',
            caddies: 'Caddie',
            carts: 'Xe golf',
            lockers: 'Tủ khóa',
        },
        users: {
            title: 'Quản lý Người dùng',
            subtitle: 'Quản lý tài khoản và quyền người dùng',
            addUser: 'Thêm người dùng',
            exportUsers: 'Xuất danh sách',
            searchPlaceholder: 'Tìm kiếm người dùng...',
            filterAll: 'Tất cả',
            filterAdmin: 'Quản trị viên',
            filterBroker: 'Môi giới',
            filterGolfer: 'Golfer',
            totalUsers: 'Tổng người dùng',
            activeAdmins: 'Admin hoạt động',
            managers: 'Quản lý',
            pendingInvites: 'Lời mời chờ',
            userProfile: 'Hồ sơ người dùng',
            noChange: 'Không thay đổi',
            actionNeeded: 'Cần xử lý',
            tableId: 'ID',
            tableName: 'Tên',
            tableEmail: 'Email',
            tableRole: 'Vai trò',
            tableBookings: 'Đặt chỗ',
            tableRevenue: 'Doanh thu',
            tableJoined: 'Tham gia',
            tableActions: 'Hành động',
            roleAdmin: 'Quản trị viên',
            roleBroker: 'Môi giới',
            roleGolfer: 'Golfer',
            roleStaff: 'Nhân viên',
            actionView: 'Xem',
            actionEdit: 'Sửa',
            actionDelete: 'Xóa',
        },
        slots: {
            title: 'Quản lý Slot thời gian',
            subtitle: 'Quản lý slot tee time cho tất cả sân golf',
            createSlot: 'Tạo slot',
            bulkUpload: 'Tải lên hàng loạt',
            selectCourse: 'Chọn sân golf',
            selectDate: 'Chọn ngày',
            timeSlot: 'Giờ chơi',
            capacity: 'Sức chứa',
            booked: 'Đã đặt',
            price: 'Giá',
            status: 'Trạng thái',
            actions: 'Hành động',
            statusAvailable: 'Còn chỗ',
            statusLimited: 'Sắp hết',
            statusFull: 'Đã đầy',
            statusClosed: 'Đóng',
            actionEdit: 'Sửa',
            actionClose: 'Đóng',
            actionOpen: 'Mở',
        },
        teeTimeRules: {
            title: 'Quản lý Quy tắc Tee Time',
            subtitle: 'Thiết lập quy tắc và tự động sinh khung giờ cho sân golf',
            addRule: 'Thêm quy tắc',
            editRule: 'Sửa quy tắc',
            startTime: 'Giờ bắt đầu',
            endTime: 'Giờ kết thúc',
            interval: 'Khoảng cách (phút)',
            maxPlayers: 'Người chơi tối đa',
            applyDays: 'Ngày áp dụng',
            status: 'Trạng thái',
            active: 'Hoạt động',
            inactive: 'Tạm dừng',
            generateSlots: 'Sinh khung giờ tự động',
            generateButton: 'Sinh khung giờ ngay',
            startDate: 'Ngày bắt đầu',
            endDate: 'Ngày kết thúc',
            successGenerate: 'Đã sinh thành công {count} slot',
            confirmDelete: 'Bạn có chắc muốn xóa quy tắc này?',
            noRules: 'Chưa có quy tắc nào được thiết lập.',
            days: {
                mon: 'Thứ 2',
                tue: 'Thứ 3',
                wed: 'Thứ 4',
                thu: 'Thứ 5',
                fri: 'Thứ 6',
                sat: 'Thứ 7',
                sun: 'Chủ nhật',
            },
        },
        reports: {
            inventory: 'Kho hàng',
            stats: 'Thống kê',
        },
        header: {
            breadcrumb: 'Trang chủ / Bảng điều khiển',
            searchPlaceholder: 'Tìm kiếm đặt chỗ, sân golf hoặc người dùng...',
            notifications: 'Thông báo',
            adminName: 'Quản trị viên',
            adminRole: 'Quản trị hệ thống',
        },
        common: {
            save: 'Lưu',
            cancel: 'Hủy',
            delete: 'Xóa',
            edit: 'Sửa',
            view: 'Xem',
            search: 'Tìm kiếm',
            filter: 'Lọc',
            export: 'Xuất',
            import: 'Nhập',
            refresh: 'Làm mới',
            loading: 'Đang tải...',
            noData: 'Không có dữ liệu',
            confirm: 'Xác nhận',
            close: 'Đóng',
            success: 'Thành công',
            error: 'Lỗi',
        },
        manager: {
            common: {
                save: 'Lưu',
                cancel: 'Hủy',
                delete: 'Xóa',
                edit: 'Sửa',
                view: 'Xem',
                search: 'Tìm kiếm',
                filter: 'Lọc',
                export: 'Xuất',
                import: 'Nhập',
                refresh: 'Làm mới',
                loading: 'Đang tải...',
                noData: 'Không có dữ liệu',
                confirm: 'Xác nhận',
                close: 'Đóng',
                success: 'Thành công',
                error: 'Lỗi',
            },
            nav: {
                teeSheet: 'Bảng giờ chơi',
                staff: 'Quản lý nhân viên',
                pricing: 'Bảng giá',
                courses: 'Thông tin sân',
                reports: 'Báo cáo',
                settings: 'Cài đặt',
                logout: 'Đăng xuất',
                adminPortal: 'Cổng Admin',
            },
            header: {
                teeSheetTitle: 'Bảng giờ chơi hàng ngày',
                staffTitle: 'Quản lý nhân viên',
                pricingTitle: 'Giá bảng giờ chơi',
                courseTitle: 'Chi tiết sân golf',
                teeSheetSub: 'Quản lý đặt chỗ và tình trạng sân',
                staffSub: 'Quản lý vai trò, sửa quyền và giám sát hoạt động tài khoản.',
                pricingSub: 'Quản lý giá cơ bản và giá sự kiện đặc biệt.',
                courseSub: 'Quản lý thông tin sân, hình ảnh và chính sách.',
                occupancy: 'Tỷ lệ lấp đầy',
                revenue: 'Doanh thu',
                newBooking: 'Đặt chỗ mới',
                daily: 'Hàng ngày',
                weekly: 'Hàng tuần',
                list: 'Danh sách',
                searchPlayer: 'Tìm người chơi...',
            },
            staff: {
                searchPlaceholder: 'Tìm kiếm theo tên, email hoặc vai trò...',
                filter: 'Lọc',
                export: 'Xuất',
                tableUser: 'Người dùng',
                tableRole: 'Vai trò',
                tablePermissions: 'Quyền hạn',
                tableStatus: 'Trạng thái',
                tableActions: 'Hành động',
                statusActive: 'Đang hoạt động',
                statusInactive: 'Ngừng hoạt động',
                showingEntries: 'Hiển thị {count} trên {total} mục',
                previous: 'Trước',
                next: 'Sau',
                activityLog: 'Nhật ký hoạt động',
                viewAll: 'Xem tất cả',
            },
            teeSheet: {
                legendConfirmed: 'Đã xác nhận',
                legendPending: 'Chờ xử lý',
                legendBlocked: 'Bị khóa/Bảo trì',
                lastUpdated: 'Cập nhật cuối: Vừa xong',
                resources: 'Tài nguyên',
                unpaid: 'Chưa thanh toán',
                mowing: 'Đang cắt cỏ',
                totalBookings: 'Tổng đặt chỗ',
                checkedIn: 'Đã check-in',
                capacityLabel: '{percent}% công suất hàng ngày',
                nextTeeTime: 'Giờ chơi tiếp theo',
                inMinutes: 'Trong {min} phút',
                autoRefresh: 'Tự động tải lại',
                searchPlaceholder: 'Tìm kiếm tên người chơi hoặc mã đặt chỗ...',
                allBookings: 'Tất cả đặt chỗ',
                holes18: '18 Hố',
                holes9: '9 Hố',
                cartsOnly: 'Chỉ xe Golf',
                vipMembers: 'Thành viên VIP',
                tableTeeTime: 'Giờ chơi',
                tablePlayerName: 'Tên người chơi',
                tableDetails: 'Chi tiết',
                tableRefId: 'Mã Ref',
                tablePayment: 'Thanh toán',
                tableStatus: 'Trạng thái',
                tableActions: 'Hành động',
                single: 'Chơi đơn',
                guests: '+ {count} khách',
            },
            pricing: {
                title: 'Giá bảng giờ chơi',
                subtitle: 'Quản lý giá cơ bản và giá sự kiện đặc biệt.',
                today: 'Hôm nay',
                tomorrow: 'Ngày mai',
                selectDates: 'Chọn ngày',
                unsavedChanges: 'Thay đổi chưa lưu',
                unsavedSubtitle: 'Bạn đã thay đổi {count} slot giá hôm nay.',
                discard: 'Hủy bỏ',
                saveAll: 'Lưu tất cả thay đổi',
                tableTimeSlot: 'Slot thời gian',
                tableBaseRate: 'Giá cơ bản ($)',
                tablePartnerNet: 'Partner Net',
                tablePlatformFee: 'Phí nền tảng',
                tableCustomerPrice: 'Giá khách hàng',
                tableActions: 'Hành động',
                closed: 'Đã đóng',
                summaryTitle: 'Tóm tắt giá',
                avgBaseRate: 'Giá cơ bản trung bình',
                lowestPrice: 'Giá thấp nhất',
                highestPrice: 'Giá cao nhất',
                overridesTitle: 'Các quy tắc đặc biệt sắp tới',
                addOverride: 'Thêm quy tắc mới',
            },
            course: {
                title: 'Chi tiết sân golf',
                subtitle: 'Quản lý thông tin sân, hình ảnh và chính sách.',
                draft: 'Bản nháp',
                viewListing: 'Xem danh sách',
                generalInfo: 'Thông tin chung',
                courseName: 'Tên sân golf',
                aboutCourse: 'Giới thiệu về sân',
                aboutPlaceholder: 'Ví dụ: Nằm giữa những ngọn đồi nhấp nhô...',
                numHoles: 'Số hố',
                holes9: '9 Hố',
                holes18: '18 Hố',
                holes36: '36 Hố',
                par: 'Par',
                operations: 'Vận hành & Chính sách',
                openingHours: 'Giờ mở cửa hàng ngày',
                to: 'đến',
                cancelPolicy: 'Chính sách hủy bỏ',
                publishing: 'Xuất bản',
                publishChanges: 'Xuất bản thay đổi',
                saveDraft: 'Lưu bản nháp',
                lastSaved: 'Lưu cuối: {time}',
                photos: 'Hình ảnh sân',
                uploadLabel: 'Click hoặc kéo thả ảnh',
                uploadHint: 'JPG, PNG tối đa 5MB',
                uploading: 'Đang tải lên...',
                proTip: 'Mẹo: Ảnh chất lượng cao của các hố đặc trưng giúp tăng tỉ lệ đặt sân lên đến 20%.',
                proShopManager: 'Quản lý Pro Shop',
                address: 'Địa chỉ',
                maxPlayers: 'Số người chơi tối đa',
                player: 'Người chơi',
                players: 'Người chơi',
                region: 'Vùng miền',
                hanoi: 'Hà Nội',
                daNang: 'Đà Nẵng',
                hoChiMinh: 'Hồ Chí Minh',
                weekdayPrice: 'Giá ngày thường (VND)',
                weekendPrice: 'Giá cuối tuần (VND)',
                teeTimes: 'Danh sách giờ chơi',
                addTime: 'Thêm giờ',
                courseList: 'Danh sách sân golf',
                addNewCourse: 'Thêm sân mới',
                refresh: 'Làm mới',
                searchPlaceholder: 'Tìm kiếm theo tên hoặc địa chỉ...',
                filterRegion: 'Vùng miền',
                filterHoles: 'Số lỗ',
                filterMaxPlayers: 'Số người chơi',
                filterPriceRange: 'Mức giá',
                all: 'Tất cả',
                under2M: 'Dưới 2 triệu',
                between2M3M: '2 - 3 triệu',
                between3M4M: '3 - 4 triệu',
                over4M: 'Trên 4 triệu',
                notAvailable: 'Chưa có',
                noCoursesFound: 'Không tìm thấy sân golf nào',
                uploadingImages: 'Đang tải lên {count} hình ảnh...',
                courseUpdatedSuccess: 'Cập nhật sân golf thành công',
                coursePublished: 'Đã xuất bản sân golf',
                draftSaved: 'Đã lưu bản nháp',
                pleaseUploadImage: 'Vui lòng tải lên ít nhất một hình ảnh',
                failedToLoadCourses: 'Không thể tải danh sách sân golf',
                errorOccurred: 'Có lỗi xảy ra',
                processing: 'Đang xử lý...',
                weekday: 'Ngày thường',
                weekend: 'Cuối tuần',
                maxPlayersLabel: 'Tối đa {count} người',
                holesLabel: '{count} lỗ',
                enterCourseName: 'Nhập tên sân golf',
                enterAddress: 'Nhập địa chỉ',
                enterWeekdayPrice: 'Giá ngày thường (VND)',
                enterWeekendPrice: 'Giá cuối tuần (VND)',
                deleteCourse: 'Xóa sân golf',
                confirmDeleteTitle: 'Xác nhận xóa sân golf',
                confirmDeleteMessage: 'Bạn có chắc chắn muốn xóa sân golf "{name}" không?',
                confirmDeleteWarning: 'Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan đến sân golf này sẽ bị xóa vĩnh viễn.',
                courseDeletedSuccess: 'Đã xóa sân golf thành công',
                deleteFailed: 'Không thể xóa sân golf',
                status: 'Trạng thái',
                active: 'Đang hoạt động',
                inactive: 'Ngừng hoạt động',
                saveChanges: 'Lưu thay đổi',
            },
        },
    },
    ko: {
        nav: {
            dashboard: '대시보드',
            bookings: '예약',
            clubs: '골프장',
            teeTimeRules: '티타임 규칙',
            slotManagement: '슬롯 관리',
            users: '사용자',
            reports: '보고서',
            inventory: '재고',
            finance: '재무',
            settings: '설정',
            logout: '로그아웃',
            groupGolf: '골프 운영',
            groupAdmin: '시스템 관리',
            managers: '계정 관리',
        },
        managers: {
            title: '계정 관리',
            subtitle: '계정 생성 및 골프장 관리 권한 부여',
            addBtn: '계정 추가',
            tableName: '성명',
            tableContact: '이메일 / 연락처',
            tableCourses: '배정된 골프장',
            tableActions: '작업',
            modalTitle: '새 계정 생성',
            labelName: '성명',
            labelPhone: '전화번호',
            labelEmail: '이메일',
            labelPassword: '비밀번호',
            labelAssign: '골프장 배정',
            btnCancel: '취소',
            btnConfirm: '생성 확인',
            empty: '계정이 없습니다',
            assignedStatus: '처리 중...'
        },
        dashboard: {
            title: '대시보드 개요',
            subtitle: '오늘의 실시간 성능 지표 및 활동.',
            aiInsights: 'AI 인사이트',
            analyzing: '분석 중...',
            exportReport: '보고서 내보내기',
            performanceAnalysis: '성능 분석',
            totalRevenue: '총 수익',
            totalBookings: '총 예약',
            brokerCommission: '중개 수수료',
            activeCourses: '활성 코스',
            revenueAnalytics: '수익 분석',
            revenueSubtitle: '최근 8기간 동안의 수입 vs 수수료',
            revenue: '수익',
            commission: '수수료',
            liveActivity: '실시간 활동',
            viewAll: '모두 보기',
            justNow: '방금 전',
            minutesAgo: '분 전',
            booked: '예약함',
            modifiedReservation: '예약 수정함',
            paidInvoice: '송장 결제함',
        },
        bookings: {
            title: '예약 관리',
            subtitle: '모든 골프 예약 보기 및 관리',
            addBooking: '예약 추가',
            exportData: '데이터 내보내기',
            searchPlaceholder: '고객명 또는 예약 코드로 검색...',
            filterAll: '전체',
            filterConfirmed: '확정됨',
            filterPending: '대기 중',
            filterCancelled: '취소됨',
            tableId: 'ID',
            tableBookingTime: '예약 시간',
            tableCustomer: '고객',
            tableCourse: '골프장',
            tableDate: '날짜',
            tableSlot: '티타임',
            tablePlayers: '플레이어',
            tablePrice: '가격',
            tableStatus: '상태',
            tablePayment: '결제',
            tableActions: '작업',
            statusConfirmed: '확정됨',
            statusPending: '대기 중',
            statusCancelled: '취소됨',
            paymentPaid: '결제 완료',
            paymentPending: '결제 대기',
            actionView: '보기',
            actionEdit: '수정',
            actionCancel: '취소',
            modalTitle: '예약 상세 정보',
            modalNoPhone: '전화번호 없음',
            modalPrint: '청구서 출력',
            modalClose: '닫기',
        },
        clubs: {
            title: '골프장 관리',
            subtitle: '골프장 정보 및 설정 관리',
            addClub: '골프장 추가',
            searchPlaceholder: '골프장 검색...',
            viewDetails: '세부정보 보기',
            editClub: '수정',
            filterAll: '전체',
            totalHoles: '총 홀 수',
            holes: '홀',
            par: '파',
            rating: '평점',
            avgRating: '평균',
            reviews: '리뷰',
            bookingsToday: '오늘 예약',
            amenities: '편의시설',
            statusMaintenance: '유지보수',
            quickFilter: '빠른 필터',
            clubhouse: '클럽하우스',
            proShop: '프로샵',
            restaurant: '레스토랑',
            drivingRange: '드라이빙 레인지',
            puttingGreen: '퍼팅 그린',
            caddies: '캐디',
            carts: '골프 카트',
            lockers: '보관함',
        },
        users: {
            title: '사용자 관리',
            subtitle: '사용자 계정 및 권한 관리',
            addUser: '사용자 추가',
            exportUsers: '목록 내보내기',
            searchPlaceholder: '사용자 검색...',
            filterAll: '전체',
            filterAdmin: '관리자',
            filterBroker: '중개인',
            filterGolfer: '골퍼',
            totalUsers: '총 사용자',
            activeAdmins: '활성 관리자',
            managers: '매니저',
            pendingInvites: '대기 중인 초대',
            userProfile: '사용자 프로필',
            noChange: '변경 없음',
            actionNeeded: '조치 필요',
            tableId: 'ID',
            tableName: '이름',
            tableEmail: '이메일',
            tableRole: '역할',
            tableBookings: '예약',
            tableRevenue: '수익',
            tableJoined: '가입일',
            tableActions: '작업',
            roleAdmin: '관리자',
            roleBroker: '중개인',
            roleGolfer: '골퍼',
            roleStaff: '직원',
            actionView: '보기',
            actionEdit: '수정',
            actionDelete: '삭제',
        },
        slots: {
            title: '시간 슬롯 관리',
            subtitle: '모든 골프장의 티타임 슬롯 관리',
            createSlot: '슬롯 생성',
            bulkUpload: '대량 업로드',
            selectCourse: '골프장 선택',
            selectDate: '날짜 선택',
            timeSlot: '티타임',
            capacity: '수용인원',
            booked: '예약됨',
            price: '가격',
            status: '상태',
            actions: '작업',
            statusAvailable: '이용 가능',
            statusLimited: '거의 마감',
            statusFull: '만석',
            statusClosed: '마감',
            actionEdit: '수정',
            actionClose: '닫기',
            actionOpen: '열기',
        },
        teeTimeRules: {
            title: '티타임 규칙 관리',
            subtitle: '골프장 티타임 규칙 설정 및 자동 슬롯 생성',
            addRule: '규칙 추가',
            editRule: '규칙 수정',
            startTime: '시작 시간',
            endTime: '종료 시간',
            interval: '간격 (분)',
            maxPlayers: '최대 인원',
            applyDays: '적용 요일',
            status: '상태',
            active: '활성',
            inactive: '비활성',
            generateSlots: '자동 슬롯 생성',
            generateButton: '슬롯 생성하기',
            startDate: '시작 날짜',
            endDate: '종료 날짜',
            successGenerate: '{count}개 슬롯이 생성되었습니다',
            confirmDelete: '이 규칙을 삭제하시겠습니까?',
            noRules: '설정된 규칙이 없습니다.',
            days: {
                mon: '월요일',
                tue: '화요일',
                wed: '수요일',
                thu: '목요일',
                fri: '금요일',
                sat: '토요일',
                sun: '일요일',
            },
        },
        reports: {
            inventory: '재고',
            stats: '통계',
        },
        header: {
            breadcrumb: '홈 / 대시보드',
            searchPlaceholder: '예약, 골프장 또는 사용자 검색...',
            notifications: '알림',
            adminName: '관리자',
            adminRole: '시스템 관리자',
        },
        common: {
            save: '저장',
            cancel: '취소',
            delete: '삭제',
            edit: '수정',
            view: '보기',
            search: '검색',
            filter: '필터',
            export: '내보내기',
            import: '가져오기',
            refresh: '새로고침',
            loading: '로딩 중...',
            noData: '데이터 없음',
            confirm: '확인',
            close: '닫기',
            success: '성공',
            error: '오류',
        },
        manager: {
            common: {
                save: '저장',
                cancel: '취소',
                delete: '삭제',
                edit: '수정',
                view: '보기',
                search: '검색',
                filter: '필터',
                export: '내보내기',
                import: '가져오기',
                refresh: '새로고침',
                loading: '로딩 중...',
                noData: '데이터 없음',
                confirm: '확인',
                close: '닫기',
                success: '성공',
                error: '오류',
            },
            nav: {
                teeSheet: '티 시트',
                staff: '직원 관리',
                pricing: '가격 관리',
                courses: '코스 정보',
                reports: '보고서',
                settings: '설정',
                logout: '로그아웃',
                adminPortal: '관리자 포털',
            },
            header: {
                teeSheetTitle: '일일 티 시트',
                staffTitle: '직원 관리',
                pricingTitle: '티 시트 가격',
                courseTitle: '코스 세부 정보',
                teeSheetSub: '예약 및 코스 가용성 관리',
                staffSub: '사용자 역할 관리, 권한 수정 및 계정 활동 모니터링.',
                pricingSub: '기본 요금 및 특별 이벤트 요령 관리.',
                courseSub: '코스 정보, 사진 및 정책 관리.',
                occupancy: '점유율',
                revenue: '수익',
                newBooking: '새 예약',
                daily: '일간',
                weekly: '주간',
                list: '목록',
                searchPlayer: '플레이어 검색...',
            },
            staff: {
                searchPlaceholder: '이름, 이메일 또는 역할로 검색...',
                filter: '필터',
                export: '내보내기',
                tableUser: '사용자',
                tableRole: '역할',
                tablePermissions: '권한',
                tableStatus: '상태',
                tableActions: '작업',
                statusActive: '활성',
                statusInactive: '비활성',
                showingEntries: '{total}개 중 {count}개 표시',
                previous: '이전',
                next: '다음',
                activityLog: '활동 로그',
                viewAll: '모두 보기',
            },
            teeSheet: {
                legendConfirmed: '확정됨',
                legendPending: '대기 중',
                legendBlocked: '차단됨/보수 중',
                lastUpdated: '최종 업데이트: 방금 전',
                resources: '리소스',
                unpaid: '미납',
                mowing: '잔디 깎는 중',
                totalBookings: '총 예약',
                checkedIn: '체크인 완료',
                capacityLabel: '일일 수용 인원의 {percent}%',
                nextTeeTime: '다음 티타임',
                inMinutes: '{min}분 후',
                autoRefresh: '자동 새로고침',
                searchPlaceholder: '플레이어 이름 또는 예약 코드로 검색...',
                allBookings: '모든 예약',
                holes18: '18홀',
                holes9: '9홀',
                cartsOnly: '카트 전용',
                vipMembers: 'VIP 회원',
                tableTeeTime: '티타임',
                tablePlayerName: '플레이어 이름',
                tableDetails: '상세 정보',
                tableRefId: '참조 ID',
                tablePayment: '결제',
                tableStatus: '상태',
                tableActions: '작업',
                single: '싱글',
                guests: '+ {count}명의 게스트',
            },
            pricing: {
                title: '티 시트 요금 설정',
                subtitle: '기본 요금 및 특별 이벤트 적용 관리.',
                today: '오늘',
                tomorrow: '내일',
                selectDates: '날짜 선택',
                unsavedChanges: '저장되지 않은 변경 사항',
                unsavedSubtitle: '오늘의 {count}개 요금 슬롯을 수정했습니다.',
                discard: '삭제',
                saveAll: '모든 변경 사항 저장',
                tableTimeSlot: '시간 슬롯',
                tableBaseRate: '기본 요금 ($)',
                tablePartnerNet: '파트너 넷',
                tablePlatformFee: '플랫폼 수수료',
                tableCustomerPrice: '고객 가격',
                tableActions: '작업',
                closed: '마감',
                summaryTitle: '요금 요약',
                avgBaseRate: '평균 기본 요금',
                lowestPrice: '최저가',
                highestPrice: '최고가',
                overridesTitle: '예정된 특별 요금 적용',
                addOverride: '새 규칙 추가',
            },
            course: {
                title: '코스 세부 정보',
                subtitle: '코스 정보, 사진 및 정책 관리.',
                draft: '임시 저장',
                viewListing: '목록 보기',
                generalInfo: '일반 정보',
                courseName: '코스 이름',
                aboutCourse: '코스 정보',
                aboutPlaceholder: '예: 완만한 언덕 사이에 위치한...',
                numHoles: '홀 수',
                holes9: '9홀',
                holes18: '18홀',
                holes36: '36홀',
                par: '파',
                operations: '운영 및 정책',
                openingHours: '일일 운영 시간',
                to: '까지',
                cancelPolicy: '취소 정책',
                publishing: '게시',
                publishChanges: '변경 사항 게시',
                saveDraft: '임시 저장',
                lastSaved: '최종 저장: {time}',
                photos: '코스 사진',
                uploadLabel: '이미지를 클릭하거나 드래그하세요',
                uploadHint: 'JPG, PNG 최대 5MB',
                uploading: '업로드 중...',
                proTip: '팁: 시그니처 홀의 고화질 사진은 예약률을 최대 20%까지 높입니다.',
                proShopManager: '프로샵 매니저',
                address: '주소',
                maxPlayers: '최대 플레이어 수',
                player: '인',
                players: '인',
                region: '지역',
                hanoi: '하노이',
                daNang: '다낭',
                hoChiMinh: '호치민',
                weekdayPrice: '평일 요금 (VND)',
                weekendPrice: '주말 요금 (VND)',
                teeTimes: '티타임 목록',
                addTime: '시간 추가',
                courseList: '골프장 목록',
                addNewCourse: '새 골프장 추가',
                refresh: '새로고침',
                searchPlaceholder: '이름 또는 주소로 검색...',
                filterRegion: '지역',
                filterHoles: '홀 수',
                filterMaxPlayers: '최대 플레이어 수',
                filterPriceRange: '가격 범위',
                all: '전체',
                under2M: '2백만원 미만',
                between2M3M: '2백만원 - 3백만원',
                between3M4M: '3백만원 - 4백만원',
                over4M: '4백만원 이상',
                notAvailable: '없음',
                noCoursesFound: '골프장을 찾을 수 없습니다',
                uploadingImages: '{count}개의 이미지 업로드 중...',
                courseUpdatedSuccess: '골프장 업데이트 성공',
                coursePublished: '골프장 게시됨',
                draftSaved: '임시 저장됨',
                pleaseUploadImage: '최소 하나의 이미지를 업로드해주세요',
                failedToLoadCourses: '골프장 목록을 불러올 수 없습니다',
                errorOccurred: '오류가 발생했습니다',
                processing: '처리 중...',
                weekday: '평일',
                weekend: '주말',
                maxPlayersLabel: '최대 {count}명',
                holesLabel: '{count}홀',
                enterCourseName: '골프장 이름 입력',
                enterAddress: '주소 입력',
                enterWeekdayPrice: '평일 요금 (VND)',
                enterWeekendPrice: '주말 요금 (VND)',
                deleteCourse: '골프장 삭제',
                confirmDeleteTitle: '골프장 삭제 확인',
                confirmDeleteMessage: '"{name}" 골프장을 정말 삭제하시겠습니까?',
                confirmDeleteWarning: '이 작업은 되돌릴 수 없습니다. 이 골프장과 관련된 모든 데이터가 영구적으로 삭제됩니다.',
                courseDeletedSuccess: '골프장이 성공적으로 삭제되었습니다',
                deleteFailed: '골프장을 삭제할 수 없습니다',
                status: '상태',
                active: '활성',
                inactive: '비활성',
                saveChanges: '변경 사항 저장',
            },
        },
    },
    en: {
        nav: {
            dashboard: 'Dashboard',
            bookings: 'Bookings',
            clubs: 'Golf Clubs',
            teeTimeRules: 'Tee Time Rules',
            slotManagement: 'Slot Management',
            users: 'Users',
            reports: 'Reports',
            inventory: 'Inventory',
            finance: 'Finance',
            settings: 'Settings',
            logout: 'Logout',
            groupGolf: 'Golf Operations',
            groupAdmin: 'System Administration',
            managers: 'Account Management',
        },
        managers: {
            title: 'Account Management',
            subtitle: 'Create accounts and assign golf course management roles',
            addBtn: 'Add Account',
            tableName: 'Full Name',
            tableContact: 'Email / Phone',
            tableCourses: 'Assigned Courses',
            tableActions: 'Actions',
            modalTitle: 'Create New Account',
            labelName: 'Full Name',
            labelPhone: 'Phone Number',
            labelEmail: 'Email',
            labelPassword: 'Password',
            labelAssign: 'Assign Golf Courses',
            btnCancel: 'Cancel',
            btnConfirm: 'Confirm Create',
            empty: 'No accounts found',
            assignedStatus: 'Processing...'
        },
        dashboard: {
            title: 'Dashboard Overview',
            subtitle: 'Real-time performance metrics and activity for today.',
            aiInsights: 'AI Insights',
            analyzing: 'Analyzing...',
            exportReport: 'Export Report',
            performanceAnalysis: 'Performance Analysis',
            totalRevenue: 'Total Revenue',
            totalBookings: 'Total Bookings',
            brokerCommission: 'Broker Commission',
            activeCourses: 'Active Courses',
            revenueAnalytics: 'Revenue Analytics',
            revenueSubtitle: 'Income vs Commission over last 8 periods',
            revenue: 'Revenue',
            commission: 'Commission',
            liveActivity: 'Live Activity',
            viewAll: 'View All',
            justNow: 'Just now',
            minutesAgo: 'min ago',
            booked: 'booked',
            modifiedReservation: 'modified reservation',
            paidInvoice: 'paid invoice',
        },
        bookings: {
            title: 'Booking Management',
            subtitle: 'View and manage all golf course bookings',
            addBooking: 'Add Booking',
            exportData: 'Export Data',
            searchPlaceholder: 'Search by customer name or booking code...',
            filterAll: 'All',
            filterConfirmed: 'Confirmed',
            filterPending: 'Pending',
            filterCancelled: 'Cancelled',
            tableId: 'ID',
            tableBookingTime: 'Booking Time',
            tableCustomer: 'Customer',
            tableCourse: 'Course',
            tableDate: 'Date',
            tableSlot: 'Tee Time',
            tablePlayers: 'Players',
            tablePrice: 'Price',
            tableStatus: 'Status',
            tablePayment: 'Payment',
            tableActions: 'Actions',
            statusConfirmed: 'Confirmed',
            statusPending: 'Pending',
            statusCancelled: 'Cancelled',
            paymentPaid: 'Paid',
            paymentPending: 'Pending',
            actionView: 'View',
            actionEdit: 'Edit',
            actionCancel: 'Cancel',
            modalTitle: 'Booking Details',
            modalNoPhone: 'No Phone Number',
            modalPrint: 'Print Invoice',
            modalClose: 'Close',
        },
        clubs: {
            title: 'Golf Club Management',
            subtitle: 'Manage golf course information and settings',
            addClub: 'Add Golf Club',
            searchPlaceholder: 'Search golf clubs...',
            viewDetails: 'View Details',
            editClub: 'Edit',
            filterAll: 'All',
            totalHoles: 'Total Holes',
            holes: 'holes',
            par: 'Par',
            rating: 'Rating',
            avgRating: 'Average',
            reviews: 'reviews',
            bookingsToday: 'Bookings Today',
            amenities: 'Amenities',
            statusMaintenance: 'Maintenance',
            quickFilter: 'Quick Filter',
            clubhouse: 'Clubhouse',
            proShop: 'Pro Shop',
            restaurant: 'Restaurant',
            drivingRange: 'Driving Range',
            puttingGreen: 'Putting Green',
            caddies: 'Caddies',
            carts: 'Golf Carts',
            lockers: 'Lockers',
        },
        users: {
            title: 'User Management',
            subtitle: 'Manage user accounts and permissions',
            addUser: 'Add User',
            exportUsers: 'Export Users',
            searchPlaceholder: 'Search users...',
            filterAll: 'All',
            filterAdmin: 'Admin',
            filterBroker: 'Broker',
            filterGolfer: 'Golfer',
            totalUsers: 'Total Users',
            activeAdmins: 'Active Admins',
            managers: 'Managers',
            pendingInvites: 'Pending Invites',
            userProfile: 'User Profile',
            noChange: 'No change',
            actionNeeded: 'Action needed',
            tableId: 'ID',
            tableName: 'Name',
            tableEmail: 'Email',
            tableRole: 'Role',
            tableBookings: 'Bookings',
            tableRevenue: 'Revenue',
            tableJoined: 'Joined',
            tableActions: 'Actions',
            roleAdmin: 'Admin',
            roleBroker: 'Broker',
            roleGolfer: 'Golfer',
            roleStaff: 'Staff',
            actionView: 'View',
            actionEdit: 'Edit',
            actionDelete: 'Delete',
        },
        slots: {
            title: 'Time Slot Management',
            subtitle: 'Manage tee time slots for all golf courses',
            createSlot: 'Create Slot',
            bulkUpload: 'Bulk Upload',
            selectCourse: 'Select Course',
            selectDate: 'Select Date',
            timeSlot: 'Time Slot',
            capacity: 'Capacity',
            booked: 'Booked',
            price: 'Price',
            status: 'Status',
            actions: 'Actions',
            statusAvailable: 'Available',
            statusLimited: 'Limited',
            statusFull: 'Full',
            statusClosed: 'Closed',
            actionEdit: 'Edit',
            actionClose: 'Close',
            actionOpen: 'Open',
        },
        teeTimeRules: {
            title: 'Tee Time Rules Management',
            subtitle: 'Configure rules and auto-generate slots for golf courses',
            addRule: 'Add Rule',
            editRule: 'Edit Rule',
            startTime: 'Start Time',
            endTime: 'End Time',
            interval: 'Interval (min)',
            maxPlayers: 'Max Players',
            applyDays: 'Apply Days',
            status: 'Status',
            active: 'Active',
            inactive: 'Inactive',
            generateSlots: 'Auto-Generate Slots',
            generateButton: 'Generate Slots Now',
            startDate: 'Start Date',
            endDate: 'End Date',
            successGenerate: 'Successfully generated {count} slots',
            confirmDelete: 'Are you sure you want to delete this rule?',
            noRules: 'No rules have been configured yet.',
            days: {
                mon: 'Monday',
                tue: 'Tuesday',
                wed: 'Wednesday',
                thu: 'Thursday',
                fri: 'Friday',
                sat: 'Saturday',
                sun: 'Sunday',
            },
        },
        reports: {
            inventory: 'Inventory',
            stats: 'Statistics',
        },
        header: {
            breadcrumb: 'Home / Dashboard',
            searchPlaceholder: 'Search bookings, courses, or users...',
            notifications: 'Notifications',
            adminName: 'Administrator',
            adminRole: 'System Admin',
        },
        common: {
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            view: 'View',
            search: 'Search',
            filter: 'Filter',
            export: 'Export',
            import: 'Import',
            refresh: 'Refresh',
            loading: 'Loading...',
            noData: 'No data',
            confirm: 'Confirm',
            close: 'Close',
            success: 'Success',
            error: 'Error',
        },
        manager: {
            common: {
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                edit: 'Edit',
                view: 'View',
                search: 'Search',
                filter: 'Filter',
                export: 'Export',
                import: 'Import',
                refresh: 'Refresh',
                loading: 'Loading...',
                noData: 'No data',
                confirm: 'Confirm',
                close: 'Close',
                success: 'Success',
                error: 'Error',
            },
            nav: {
                teeSheet: 'Tee Sheet',
                staff: 'Staff Management',
                pricing: 'Pricing',
                courses: 'Course Info',
                reports: 'Reports',
                settings: 'Settings',
                logout: 'Logout',
                adminPortal: 'Admin Portal',
            },
            header: {
                teeSheetTitle: 'Daily Tee Sheet',
                staffTitle: 'Staff Management',
                pricingTitle: 'Tee Sheet Pricing',
                courseTitle: 'Course Details',
                teeSheetSub: 'Manage bookings and course availability',
                staffSub: 'Manage user roles, modify permissions, and monitor recent account activity securely.',
                pricingSub: 'Manage your base rates and override special events.',
                courseSub: 'Manage your course information, photos, and policies.',
                occupancy: 'Occupancy',
                revenue: 'Revenue',
                newBooking: 'New Booking',
                daily: 'Daily',
                weekly: 'Weekly',
                list: 'List',
                searchPlayer: 'Search player...',
            },
            staff: {
                searchPlaceholder: 'Search by name, email, or role...',
                filter: 'Filter',
                export: 'Export',
                tableUser: 'User',
                tableRole: 'Role',
                tablePermissions: 'Permissions',
                tableStatus: 'Status',
                tableActions: 'Actions',
                statusActive: 'Active',
                statusInactive: 'Inactive',
                showingEntries: 'Showing {count} of {total} entries',
                previous: 'Previous',
                next: 'Next',
                activityLog: 'Activity Log',
                viewAll: 'View All',
            },
            teeSheet: {
                legendConfirmed: 'Confirmed',
                legendPending: 'Pending',
                legendBlocked: 'Blocked/Maint',
                lastUpdated: 'Last updated: Just now',
                resources: 'Resources',
                unpaid: 'Unpaid',
                mowing: 'Mowing',
                totalBookings: 'Total Bookings',
                checkedIn: 'Checked In',
                capacityLabel: '{percent}% of daily capacity',
                nextTeeTime: 'Next Tee Time',
                inMinutes: 'In {min} minutes',
                autoRefresh: 'Auto-refresh',
                searchPlaceholder: 'Search player name or booking ref...',
                allBookings: 'All Bookings',
                holes18: '18 Holes',
                holes9: '9 Holes',
                cartsOnly: 'Carts Only',
                vipMembers: 'VIP Members',
                tableTeeTime: 'Tee Time',
                tablePlayerName: 'Player Name',
                tableDetails: 'Details',
                tableRefId: 'Ref ID',
                tablePayment: 'Payment',
                tableStatus: 'Status',
                tableActions: 'Actions',
                single: 'Single',
                guests: '+ {count} Guests',
            },
            pricing: {
                title: 'Tee Sheet Pricing',
                subtitle: 'Manage your base rates and override special events.',
                today: 'Today',
                tomorrow: 'Tomorrow',
                selectDates: 'Select Dates',
                unsavedChanges: 'Unsaved Changes',
                unsavedSubtitle: 'You have modified {count} pricing slots for today.',
                discard: 'Discard',
                saveAll: 'Save All Changes',
                tableTimeSlot: 'Time Slot',
                tableBaseRate: 'Base Rate ($)',
                tablePartnerNet: 'Partner Net',
                tablePlatformFee: 'Platform Fee',
                tableCustomerPrice: 'Customer Price',
                tableActions: 'Actions',
                closed: 'Closed',
                summaryTitle: 'Pricing Summary',
                avgBaseRate: 'Average Base Rate',
                lowestPrice: 'Lowest Price',
                highestPrice: 'Highest Price',
                overridesTitle: 'Upcoming Special Overrides',
                addOverride: 'Add New Override Rule',
            },
            course: {
                title: 'Course Details',
                subtitle: 'Manage your course information, photos, and policies.',
                draft: 'Draft',
                viewListing: 'View Listing',
                generalInfo: 'General Information',
                courseName: 'Course Name',
                aboutCourse: 'About the Course',
                aboutPlaceholder: 'e.g. Nestled in the rolling hills...',
                numHoles: 'Number of Holes',
                holes9: '9 Holes',
                holes18: '18 Holes',
                holes36: '36 Holes',
                par: 'Par',
                operations: 'Operations & Policies',
                openingHours: 'Daily Opening Hours',
                to: 'to',
                cancelPolicy: 'Cancellation Policy',
                publishing: 'Publishing',
                publishChanges: 'Publish Changes',
                saveDraft: 'Save Draft',
                lastSaved: 'Last saved: {time}',
                photos: 'Course Photos',
                uploadLabel: 'Click or drag images',
                uploadHint: 'JPG, PNG up to 5MB',
                uploading: 'Uploading...',
                proTip: 'Pro Tip: High-quality photos of signature holes increase booking rates by up to 20%.',
                proShopManager: 'Pro Shop Manager',
                address: 'Address',
                maxPlayers: 'Maximum Players',
                player: 'Player',
                players: 'Players',
                region: 'Region',
                hanoi: 'Hanoi',
                daNang: 'Da Nang',
                hoChiMinh: 'Ho Chi Minh',
                weekdayPrice: 'Weekday Price (VND)',
                weekendPrice: 'Weekend Price (VND)',
                teeTimes: 'Tee Times',
                addTime: 'Add Time',
                courseList: 'Course List',
                addNewCourse: 'Add New Course',
                refresh: 'Refresh',
                searchPlaceholder: 'Search by name or address...',
                filterRegion: 'Region',
                filterHoles: 'Number of Holes',
                filterMaxPlayers: 'Max Players',
                filterPriceRange: 'Price Range',
                all: 'All',
                under2M: 'Under 2M',
                between2M3M: '2M - 3M',
                between3M4M: '3M - 4M',
                over4M: 'Over 4M',
                notAvailable: 'Not Available',
                noCoursesFound: 'No courses found',
                uploadingImages: 'Uploading {count} images...',
                courseUpdatedSuccess: 'Course updated successfully',
                coursePublished: 'Course published',
                draftSaved: 'Draft saved',
                pleaseUploadImage: 'Please upload at least one image',
                failedToLoadCourses: 'Failed to load courses',
                errorOccurred: 'An error occurred',
                processing: 'Processing...',
                weekday: 'Weekday',
                weekend: 'Weekend',
                maxPlayersLabel: 'Max {count} players',
                holesLabel: '{count} holes',
                enterCourseName: 'Enter course name',
                enterAddress: 'Enter address',
                enterWeekdayPrice: 'Weekday price (VND)',
                enterWeekendPrice: 'Weekend price (VND)',
                deleteCourse: 'Delete Course',
                confirmDeleteTitle: 'Confirm Delete Course',
                confirmDeleteMessage: 'Are you sure you want to delete the course "{name}"?',
                confirmDeleteWarning: 'This action cannot be undone. All data related to this course will be permanently deleted.',
                courseDeletedSuccess: 'Course deleted successfully',
                deleteFailed: 'Failed to delete course',
                status: 'Status',
                active: 'Active',
                inactive: 'Inactive',
                saveChanges: 'Save Changes',
            },
        },
    },
};
